import {
  Body,
  Param,
  Delete,
  Put,
  Controller,
  Get,
  Post,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.findOne(id);

    if (!user)
      throw new NotFoundException({
        statusCode: 404,
        message: `User with this ID was not found`,
        error: 'Not Found',
      });

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.findOne(id);
    return this.userService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.findOne(id);

    if (updateUserDto.oldPassword !== user.password)
      throw new ForbiddenException({
        statusCode: 403,
        message: 'The wrong password was entered',
        error: 'Forbidden',
      });

    return this.userService.update(id, updateUserDto, user);
  }
}
