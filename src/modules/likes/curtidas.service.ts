import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurtidasRepository } from './curtidas.repository'

import {  PublicacoesService } from '../publication/publicacoes.service'

import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'
import { RetornoDto  } from './dto/retorno.dto'

@Injectable()
export class CurtidasService {

  constructor(
    private readonly publicacaoRepository:PublicacoesService,
    @InjectRepository(CurtidasRepository) private readonly repository: CurtidasRepository,
  ) {}

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

  public async curtir(values:CreateDto){

    let publicacaoCurtidaPorUsuario = await this.repository.find({ where:{ usuario_id: values.usuario_id }})

    if(Object.keys(publicacaoCurtidaPorUsuario).length != 0){
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
      //delete criarPrimeiraCurtidaDoUsuarioDestaPublicacao.id
      let curtida = await this.repository.save(criarPrimeiraCurtidaDoUsuarioDestaPublicacao)
      this.publicacaoRepository.incrementCurtida(criarPrimeiraCurtidaDoUsuarioDestaPublicacao.publicacao_id)
      return curtida
    }
  }

  public async todasPublicacaoDoUsuario(id:any) {
    return await this.repository.find({ where:{ usuario_id: id }})
  }

  public async todasPublicacaoDoUsuarioPorPublicacao(usuario:any, publicacao:any) {
    return await this.repository.find({ where:{ usuario_id: usuario, publicacao_id:publicacao }})
  }
}

