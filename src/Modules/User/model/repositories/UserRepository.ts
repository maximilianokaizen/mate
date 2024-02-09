import { PrismaClient } from '@prisma/client';
import { UserInterface } from '../../model/interfaces/UserInterface';
import Logger from '../../../Shared/domain/Logger';
import WinstonLogger from '../../../Shared/infrastructure/WinstoneLogger';
import { InternalResponse } from '../../../Shared/dto/InternalResponse';
import { UsersInterface } from '../interfaces/UsersInterface';
import { OneUserInterface } from '../interfaces/OneUserInterface';

export class UserRepository {
  private prisma: PrismaClient;
  private readonly logger: Logger;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = new WinstonLogger();
  }

  async create(userData: UserInterface): Promise<InternalResponse> {
    try {
      const { id, ...createData } = userData; // eslint-disable-line @typescript-eslint/no-unused-vars
      await this.prisma.user.create({ data: createData });
      return { success: true, message: 'User created successfully' };
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error creating user' };
    }
  }

  async getAll(page: number, perPage: number): Promise<UsersInterface> {
    try {
      const skip = (page - 1) * perPage;
      const users = await this.prisma.user.findMany({
        where: {
          active: true
        },
        skip,
        take: perPage
      });
      return { success: true, message: 'Users retrieved successfully', users: users };
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error retrieving users' };
    }
  }

  async getUserById(uuid: string): Promise<OneUserInterface> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          uuid: uuid,
          active: true
        }
      });
      if (user) {
        return { success: true, user };
      } else {
        return { success: false };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Cannot get user' };
    }
  }

  async update(uuid: string, userData: UserInterface): Promise<InternalResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { uuid: uuid, active: true }
      });
      if (user) {
        const { id, ...updatedData } = userData; // eslint-disable-line @typescript-eslint/no-unused-vars
        await this.prisma.user.update({
          where: { uuid: uuid },
          data: updatedData
        });
        return { success: true, message: 'User updated successfully' };
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Error updating user' };
    }
  }

  async delete(uuid: string): Promise<InternalResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { uuid: uuid }
      });
      if (user) {
        await this.prisma.user.update({
          where: { uuid: uuid },
          data: { active: false, deletedAt: new Date() }
        });
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false };
    }
  }

  async getByEmail(email: string): Promise<OneUserInterface> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email, active: true }
      });

      if (user) {
        return { success: true, user };
      } else {
        return { success: false };
      }
    } catch (error) {
      this.logger.error(error);
      return { success: false, message: 'Cannot get user by email' };
    }
  }
}
