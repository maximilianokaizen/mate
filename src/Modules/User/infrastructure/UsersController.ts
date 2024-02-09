import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Name } from '../../Shared/domain/value-object/User/Name';
import { LastName } from '../../Shared/domain/value-object/User/LastName';
import { Email } from '../../Shared/domain/value-object/Email';
import { UserName } from '../../Shared/domain/value-object/User/UserName';
import { UserPassword } from '../../Shared/domain/value-object/User/UserPassword';
import { Active } from '../../Shared/domain/value-object/User/Active';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { CreatedAt } from '../../Shared/domain/value-object/CreatedAt';
import { Page } from '../../Shared/domain/value-object/Page';
import { HttpResponseCodes } from '../../Shared/HttpResponseCodes';
import { UsersService } from '../application/services/UsersService';
import Logger from '../../Shared/domain/Logger';
import WinstonLogger from '../../Shared/infrastructure/WinstoneLogger';
import { GeneralConstants } from '../../Shared/constants';
import { ControllerError } from '../../Shared/domain/exceptions/ControllerException';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export class UsersController {
  private readonly userService: UsersService;
  private readonly logger: Logger;

  constructor() {
    this.userService = new UsersService();
    this.logger = new WinstonLogger();
  }

  async createUser(req: Request, res: Response) {
    try {
      const uuid = new Uuid(uuidv4());
      const name = new Name(req.body.name);
      const lastName = new LastName(req.body.lastName);
      const userName = new UserName(req.body.userName);
      const email = new Email(req.body.email);
      const password = new UserPassword(req.body.password);
      const active = new Active(req.body.active);
      const createdAt = new CreatedAt(new Date());
      const hashedPassword = await bcrypt.hash(password.value, 10);
      const response = await this.userService.create(
        uuid.valueAsString,
        name,
        lastName,
        email,
        userName,
        hashedPassword,
        active,
        createdAt
      );
      if (response.success) {
        res.status(HttpResponseCodes.CREATED).json(response);
      } else {
        throw new ControllerError('Error creating new user', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
      }
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await this.userService.getAll(page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).send({
          status: GeneralConstants.STATUS_OK,
          users: response.users
        });
      } else {
        throw new ControllerError('Error geeting all users', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
      }
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const uuidParam = req.params.userId;
      const response = await this.userService.getById(uuidParam);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        throw new ControllerError('Error get user by uuid', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const uuidParam = req.params.userId;
      const name = req.body.name ? new Name(req.body.name).value : undefined;
      const lastName = req.body.lastName ? new LastName(req.body.lastName).value : undefined;
      const password = req.body.password ? new UserPassword(req.body.password).value : undefined;
      const active = req.body.active !== undefined ? new Active(req.body.active).value : undefined;
      const response = await this.userService.update(uuidParam, {
        name,
        lastName,
        password,
        active
      });
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      this.logger.error(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const uuidParam = req.params.userId;
      const response = await this.userService.delete(uuidParam);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        throw new ControllerError('Error trying delete a specific user', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
      }
    }
  }

  async authenticateUser(req: Request, res: Response) {
    try {
      const email = new Email(req.body.email);
      const password = req.body.password;
      const response = await this.userService.authenticate(email, password);

      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        throw new ControllerError('Error in auth user', HttpResponseCodes.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(error);
      if (error instanceof ControllerError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
      }
    }
  }
}
