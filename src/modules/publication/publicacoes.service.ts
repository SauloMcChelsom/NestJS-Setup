import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PublicacoesRepository } from './publicacoes.repository'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class PublicacoesService {

  constructor(@InjectRepository(PublicacoesRepository) private readonly repository: PublicacoesRepository) {}

  public async save(values:any) {
    const res = await this.repository.save(values)
    return new RetornoDto(res)
  }

  public async findOne(id:any) {
    const res = await this.repository.findOne({ where:{ id: id }})
    return new RetornoDto(res)
  }

  public async findAll() {
    const res = await this.repository.find();
    return res.map((r)=> new RetornoDto(r))
  }

  public async update(id:any, values:any) {
    await this.repository.update(id, values);
    const res = await this.repository.findOne(id)
    return new RetornoDto(res)
  }

  public async delete(id:any) {
    await this.repository.delete(id);
    return {"mensagem":"deletado"}
  }

  public async feed(id:string) {
    return await this.repository.feed();
  }

  public async incrementCurtida(id:any) {
    let publicacao = await this.repository.findOne({ where:{ id: id }})
    
    if(publicacao){
      publicacao.number_of_likes++ 
      await this.repository.update(publicacao.id, publicacao);
    }

  }

  public async decrementCurtida(id:any) { 
    let publicacao = await this.repository.findOne({ where:{ id: id }})
    if(publicacao){
      publicacao.number_of_likes--

      await this.repository.update(publicacao.id, publicacao);
    }

  }
}

