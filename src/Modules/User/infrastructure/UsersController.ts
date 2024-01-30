import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
/* Value Objects */
import { Name } from '../../Shared/domain/value-object/User/Name';
import { LastName } from '../../Shared/domain/value-object/User/LastName';
import { Email } from '../../Shared/domain/value-object/Email';
import { UserName } from '../../Shared/domain/value-object/User/UserName';
import { UserPassword } from '../../Shared/domain/value-object/User/UserPassword';
import { Active } from '../../Shared/domain/value-object/User/Active';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { CreatedAt } from '../../Shared/domain/value-object/CreatedAt';
import { HttpResponseCodes } from '../../Shared/HttpResponseCodes';
import { UsersService } from '../application/services/UsersService';
import Logger from '../../Shared/domain/Logger';
import WinstonLogger from '../../Shared/infrastructure/WinstoneLogger';

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
      const response = await this.userService.create(
        uuid.valueAsString,
        name,
        lastName,
        email,
        userName,
        password,
        active,
        createdAt
      );
      if (response.success) {
        res.status(HttpResponseCodes.CREATED).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      this.logger.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    res.status(200).send({
      status: 'OK',
      message: 'Lista de usuarios.'
    });
  }

  async getUserById(req: Request, res: Response) {
    res.status(200).send({
      status: 'OK',
      message: 'Detalles del usuario.'
    });
  }

  async updateUser(req: Request, res: Response) {
    res.status(200).send({
      status: 'OK',
      message: 'Usuario actualizado correctamente.'
    });
  }

  async deleteUser(req: Request, res: Response) {
    res.status(200).send({
      status: 'OK',
      message: 'Usuario eliminado correctamente.'
    });
  }
}
