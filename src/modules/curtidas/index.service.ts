import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndexRepository } from './index.repository'

import {  PublicacaoService } from '../publicacao/index.service'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class IndexService {

  constructor(
    private readonly publicacaoRepository:PublicacaoService,
    @InjectRepository(IndexRepository) private readonly repository: IndexRepository,

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

  public async curtir(values:CreateDto){

    let publicacaoCurtidaPorUsuario = await this.repository.find({ where:{ usuario_id: values.usuario_id }})

    if(publicacaoCurtidaPorUsuario != undefined){
     let curtida = new RetornoDto(publicacaoCurtidaPorUsuario[0])

      if(curtida.eu_curti){
        curtida.eu_curti = false
        await this.publicacaoRepository.decrementCurtida(curtida.publicacao_id)
      }else{
        curtida.eu_curti = true
        await this.publicacaoRepository.incrementCurtida(curtida.publicacao_id)
      }
      this.update(curtida.id, curtida)

      return curtida
    }else{
      let criarPrimeiraCurtidaDoUsuarioDestaPublicacao = new RetornoDto(values)
      criarPrimeiraCurtidaDoUsuarioDestaPublicacao.eu_curti = true
      delete criarPrimeiraCurtidaDoUsuarioDestaPublicacao.id
      return await this.repository.save(criarPrimeiraCurtidaDoUsuarioDestaPublicacao)
    }
  }

  public async todasPublicacaoDoUsuario(id) {
    return await this.repository.find({ where:{ usuario_id: id }})
  }

  public async todasPublicacaoDoUsuarioPorPublicacao(usuario, publicacao) {
    return await this.repository.find({ where:{ usuario_id: usuario, publicacao_id:publicacao }})
  }
}

