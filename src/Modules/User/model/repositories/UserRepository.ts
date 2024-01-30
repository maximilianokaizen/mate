import { PrismaClient } from '@prisma/client';
import { UserInterface } from '../../model/interfaces/UserInterface';
import Logger from '../../../Shared/domain/Logger';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import { InternalResponse } from '../../../Shared/dto/InternalResponse';

export class UserRepository {
  private prisma: PrismaClient;
  private readonly logger: Logger;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = new WinstonLogger();
  }

  async create(userData: UserInterface): Promise<InternalResponse> {
    try {
      const { id, ...createData } = userData;
      await this.prisma.user.create({ data: createData });
      return { success: true, message: 'User created successfully' };
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error creating user' };
    }
  }

  async getAllUsers(): Promise<any> {
    /*
    return this.prisma.user.findMany();
    */
  }

  async getUserById(uuid: string): Promise<any> {
    /*
    return this.prisma.user.findUnique({
      where: { uuid: uuid }
    });
    */
  }

  async updateUser(userId: number, userData: UserInterface): Promise<any> {
    /*
    return this.prisma.user.update({
      where: { id: userId },
      data: userData
    });
    */
  }

  async deleteUser(uuid: number): Promise<any> {
    /*
    return this.prisma.user.update({
      where: { uuid: uuid },
      data: { deletedAt: new Date() }
    });
    */
  }
}
