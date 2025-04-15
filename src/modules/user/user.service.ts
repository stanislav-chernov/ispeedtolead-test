import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/modules/user/user.repository';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UserDto } from '@/modules/user/dto/user.dto';
import { Mapper } from '@/common/utils/mapper.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async passwordIsValid(userId: string, password: string): Promise<boolean> {
    const userDocument = await this.userRepository.findById(userId);
    if (!userDocument) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return bcrypt.compareSync(password, userDocument.password);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const userDocument = await this.userRepository.createUser(
      createUserDto.login,
      createUserDto.password,
    );
    return Mapper.plainToDto(UserDto, userDocument);
  }

  async findByLogin(login: string): Promise<UserDto | null> {
    const userDocument = await this.userRepository.findByLogin(login);
    return userDocument ? Mapper.plainToDto(UserDto, userDocument) : null;
  }

  async getById(id: string): Promise<UserDto> {
    const userDocument = await this.userRepository.findById(id);
    if (!userDocument) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return Mapper.plainToDto(UserDto, userDocument);
  }
}
