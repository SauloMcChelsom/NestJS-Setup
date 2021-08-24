import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexRepository } from './index.repository'

//import { IndexService as CurtidasServices } from '../curtidas/index.service'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'
import { CurtirDto  } from './dto/curtir.dto'

@Injectable()
export class IndexService {

  constructor(
    @InjectRepository(IndexRepository) private readonly repository: IndexRepository,
    //private curtidasServices:CurtidasServices
  ) {}

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

  public async curtir(values:CurtirDto){
    let curtida = await this.repository.findOne({ where:{ publicacao_id: values.publicacao_id }})
        curtida = new RetornoDto(curtida)
    if(curtida.eu_curti){
      curtida.eu_curti = false
      this.update(curtida.id, curtida)
      //this.curtidasServices.decrement(curtida.publicacao_id)
    }else{
      curtida.eu_curti = true
      this.update(curtida.id, curtida)
      //this.curtidasServices.increment(curtida.publicacao_id)
    }
    return curtida
  }
  
}

