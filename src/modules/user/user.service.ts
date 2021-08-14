import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto  } from './dto/update-user.dto'
import { RetornoUserDto  } from './dto/retorno-user.dto'

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

  public async save(user:CreateUserDto) {
    const res = await this.userRepository.save(user)
    return new RetornoUserDto(res)
  }

  public async findOne(id) {
    const res = await this.userRepository.findOne({ where:{ id: id }})
    return new RetornoUserDto(res)
  }

  public async update(id, user:UpdateUserDto) {
    await this.userRepository.update(id, user);
    const res = await this.userRepository.findOne(id)
    return new RetornoUserDto(res)
  }

  public async delete(id) {
    return await this.userRepository.delete(id);
  }

  public async findAll() {
    return await this.userRepository.find();
  }

  public async deleteTodosUsuarios() {
    await this.userRepository.deleteTodosUsuarios();
    return {"mensagem":"Todos usuarios deletados"}
  }
}

