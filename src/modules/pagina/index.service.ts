import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexRepository } from './index.repository'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

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

  public async findAll() {
    const res = await this.indexRepository.find();
    return res.map((r)=> new RetornoDto(r))
  }

  public async update(id, user:UpdateDto) {
    await this.indexRepository.update(id, user);
    const res = await this.indexRepository.findOne(id)
    return new RetornoDto(res)
  }

  public async delete(id) {
    await this.indexRepository.delete(id);
    return {"mensagem":"Usuario deletado"}
  }
}

