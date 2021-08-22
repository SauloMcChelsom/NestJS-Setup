import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexRepository } from './index.repository'

import { CreateDto } from './dto/create.dto'
import { UpdateUserDto  } from './dto/update-user.dto'
import { RetornoDto  } from './dto/retorno-user.dto'

@Injectable()
export class IndexService {

  constructor(@InjectRepository(IndexRepository) private readonly indexRepository: IndexRepository) {}

  public async save(values:CreateDto) {
    const res = await this.indexRepository.save(values)
    return new RetornoDto(res)
  }

  public async findOne(id) {
    const res = await this.indexRepository.findOne({ where:{ id: id }})
    return new RetornoDto(res)
  }

  public async update(id, user:UpdateUserDto) {
    await this.indexRepository.update(id, user);
    const res = await this.indexRepository.findOne(id)
    return new RetornoDto(res)
  }

  public async delete(id) {
    return await this.indexRepository.delete(id);
  }

  public async findAll() {
    return await this.indexRepository.find();
  }

  public async deleteTodosUsuarios() {
    await this.indexRepository.deleteTodosUsuarios();
    return {"mensagem":"Todos usuarios deletados"}
  }
}

