import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexRepository } from './index.repository'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class PublicacaoService {

  constructor(@InjectRepository(IndexRepository) private readonly repository: IndexRepository) {}

  public async save(values:CreateDto) {
    const res = await this.repository.save(values)
    return new RetornoDto(res)
  }

  public async findOne(id) {
    const res = await this.repository.findOne({ where:{ id: id }})
    return new RetornoDto(res)
  }

  public async findAll() {
    const res = await this.repository.find();
    return res.map((r)=> new RetornoDto(r))
  }

  public async update(id, values:UpdateDto) {
    await this.repository.update(id, values);
    const res = await this.repository.findOne(id)
    return new RetornoDto(res)
  }

  public async delete(id) {
    await this.repository.delete(id);
    return {"mensagem":"deletado"}
  }

  public async feedPublic() {
    return await this.repository.feedPublic();
  }

  public async incrementCurtida(id) {
    let publicacao = await this.repository.findOne({ where:{ id: id }})
    
 
     publicacao.quantidade_de_curtidas++ 

    await this.repository.update(publicacao.id, publicacao);
  }

  public async decrementCurtida(id) { 
    let publicacao = await this.repository.findOne({ where:{ id: id }})
    
    publicacao.quantidade_de_curtidas--

    await this.repository.update(publicacao.id, publicacao);
  }
}

