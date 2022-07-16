import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/database';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private database: Database<User>;

  constructor() {
    this.database = new Database<User>(User);
  }

  async create(createUserDto: CreateUserDto) {
    const data = {
      id: v4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return this.database.create(data);
  }

  findAll() {
    return this.database.findAll();
  }

  async findOne(id: string) {
    return this.database.findOne(id);
  }

  async remove(id: string) {
    return this.database.remove(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: User) {
    const data = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    return this.database.update(id, data);
  }
}
