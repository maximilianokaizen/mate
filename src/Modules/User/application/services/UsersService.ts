/* Value Objects */
import { Name } from '../../../Shared/domain/value-object/User/Name';
import { LastName } from '../../../Shared/domain/value-object/User/LastName';
import { Email } from '../../../Shared/domain/value-object/Email';
import { UserName } from '../../../Shared/domain/value-object/User/UserName';
import { Active } from '../../../Shared/domain/value-object/User/Active';
import { CreatedAt } from '../../../Shared/domain/value-object/CreatedAt';
import { UserPassword } from '../../../Shared/domain/value-object/User/UserPassword';
import { Page } from '../../../Shared/domain/value-object/Page';
import { InternalResponse } from '../../../Shared/dto/InternalResponse';
import { UserInterface } from '../../model/interfaces/UserInterface';
import { UserRepository } from '../../model/repositories/UserRepository';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import Logger from '../../../Shared/domain/Logger';
import { Constants } from '../../Shared/constants';
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
    password: UserPassword,
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
        password: password.value,
        active: active.value,
        createdAt: createdAt.value
      };
      return await this.userRepository.create(user);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAll(page: Page): Promise<any> {
    const perPage = Constants.RECORDS_PER_PAGE;
    return await this.userRepository.getAll(page.getValue(), perPage);
  }

  async getById(uuid: string): Promise<any> {
    return await this.userRepository.getUserById(uuid);
  }

  async update(userId: number, userData: any): Promise<any> {
    /*
        return this.prisma.user.update({
            where: { id: userId },
            data: userData
        });
        */
  }

  async delete(userId: number): Promise<any> {
    /*
        return this.prisma.user.update({
            where: { id: userId },
            data: { deletedAt: new Date() }
        });
        */
  }
}
