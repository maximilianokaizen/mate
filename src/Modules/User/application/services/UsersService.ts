import { Name } from '../../../Shared/domain/value-object/User/Name';
import { LastName } from '../../../Shared/domain/value-object/User/LastName';
import { Email } from '../../../Shared/domain/value-object/Email';
import { UserName } from '../../../Shared/domain/value-object/User/UserName';
import { Active } from '../../../Shared/domain/value-object/User/Active';
import { CreatedAt } from '../../../Shared/domain/value-object/CreatedAt';
import { Page } from '../../../Shared/domain/value-object/Page';
import { InternalResponse } from '../../../Shared/dto/InternalResponse';
import { UserInterface } from '../../model/interfaces/UserInterface';
import { UserRepository } from '../../model/repositories/UserRepository';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import Logger from '../../../Shared/domain/Logger';
import { Constants } from '../../Shared/constants';
import { CaseUseException } from '../../../Shared/domain/exceptions/CaseUseException';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export class UsersService {
  private readonly userRepository: UserRepository;
  private readonly logger: Logger;
  constructor() {
    this.userRepository = new UserRepository();
    this.logger = new WinstonLogger();
  }

  async create(
    uuid: string,
    name: Name,
    lastName: LastName,
    email: Email,
    userName: UserName,
    password: string,
    active: Active,
    createdAt: CreatedAt
  ): Promise<InternalResponse> {
    try {
      const user: UserInterface = {
        uuid: uuid,
        name: name.value,
        lastName: lastName.value,
        email: email.value,
        user: userName.value,
        password,
        active: active.value,
        createdAt: createdAt.value
      };
      return await this.userRepository.create(user);
    } catch (error) {
      this.logger.error(error);
      throw new CaseUseException('Error creating user');
    }
  }

  async getAll(page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    try {
      return await this.userRepository.getAll(page.getValue(), perPage);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getById(uuid: string): Promise<any> {
    return await this.userRepository.getUserById(uuid);
  }

  async update(uuid: string, userData: any): Promise<InternalResponse> {
    try {
      const existingUser = await this.getById(uuid);
      if (existingUser.success) {
        const updatedUserData: UserInterface = {
          ...existingUser.user,
          ...userData
        };
        return await this.userRepository.update(uuid, updatedUserData);
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error updating user' };
    }
  }

  async delete(uuid: string): Promise<any> {
    return await this.userRepository.delete(uuid);
  }

  async authenticate(email: Email, password: string): Promise<InternalResponse> {
    try {
      const user = await this.userRepository.getByEmail(email.value);
      if (!user.success) {
        return { success: false, message: 'User not found' };
      }

      const validPassword = await bcrypt.compare(password, user.user?.password);
      if (!validPassword) {
        return { success: false, message: 'Invalid password' };
      }

      return { success: true, message: 'Authentication successful' };
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Authentication failed' };
    }
  }
}
