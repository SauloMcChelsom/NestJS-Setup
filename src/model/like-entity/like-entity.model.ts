import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PublicationEntityModel } from '@model/publication-entity/publication-entity.model'

import { code, message } from '@root/src/shared/enum'
import { CreateLike } from '@shared/interfaces/like.interface'
import { LikeEntityRepository } from './like-entity.repository'

@Injectable()
export class LikeEntityModel {
  constructor(
    @InjectRepository(LikeEntityRepository)
    private readonly repository: LikeEntityRepository,
    private readonly publication:PublicationEntityModel
  ) {}

  public async save(body: CreateLike) {
    try {
      await this.repository.save(body).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async userAlreadyLikePublication(publicationId: string, userId: string ) {
    const res = await this.repository.findOne({
      where: { publication_id: publicationId, user_id: userId },
    }).catch((err) => {
      throw new HttpException({
        code : code.QUERY_FAILED,
        message :  `${err.detail || err.hint || err.routine}`,
        description : ''
      }, HttpStatus.BAD_REQUEST)
    })

    if (res) {
      return true
    } else {
      return false
    }
  }

  public async validatePublicationExists(publicationId: number) {
    try {
      const res = await this.repository.findOne({
        where: { publication_id: publicationId },
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return true
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not validate publication exists',
        description : ''
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async getLike(publication_id: string, userId: string) {
    try {

      const res = await this.repository.findOne({
        where: { publication_id: publication_id, user_id: userId },
      }).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if (res) {
        return res
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found like',
        description : ''
      }, HttpStatus.NOT_FOUND)

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async updateLike(id: string, body: any) {
    try {
      
      const res = await this.repository.update(id, body).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message :  `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      })

      if(!res){
        throw new HttpException({
          code : code.NOT_FOUND,
          message : 'delete, id not found',
          description : ''
        }, HttpStatus.NOT_FOUND)
      }

      if (res.affected == 1) {
        return {
          code : code.SUCCESSFULLY_DELETED,
          message : 'delete with sucess',
          description : ''
        };
      }

    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }

  public async create(body: CreateLike) {
    //verificar se o usuario ja curtiu a publicacao
    const amLiking = await this.userAlreadyLikePublication(
      body.publication_id.toString(),
      body.user_id.toString(),
    );

    if (amLiking) {
      //se houver registro,  verifica se esta curtindo
      const segments = await this.getLike(
        body.publication_id.toString(),
        body.user_id.toString(),
      );

      if (segments.i_liked) {
        //se sim, atualiza para 'para de curtir' e atualizar o contator na tabela publication para --
        await this.updateLike(segments.id.toString(), { i_liked: false });
        await this.publication.decrementNumberLikeOfPublication(
          segments.publication_id,
        );
        return await this.getLike(
          body.publication_id.toString(),
          body.user_id.toString(),
        );
      } else {
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.updateLike(segments.id.toString(), { i_liked: true });
        await this.publication.incrementNumberLikeOfPublication(
          segments.publication_id,
        );
        return await this.getLike(
          body.publication_id.toString(),
          body.user_id.toString(),
        );
      }
    } else {
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      body.i_liked = true;
      await this.save(body);
      await this.publication.incrementNumberLikeOfPublication(
        body.publication_id.toString(),
      );
      return await this.getLike(
        body.publication_id.toString(),
        body.user_id.toString(),
      );
    }
  }
}
