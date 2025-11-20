import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...user } = createUserDto;
      const hashPassword = await hash(password);
      return await this.prisma.users.create({
        data: {
          password: hashPassword,
          ...user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.users.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(userId: number) {
    try {
      return await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateHashedRefreshToken(userId: number, hashedRT: string) {
    return await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRT,
      },
    });
  }
}
