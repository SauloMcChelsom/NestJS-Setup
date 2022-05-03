import { HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { PublicationEntityModel } from '@model/publication-entity/publication-entity.model'

import { code, message } from '@root/src/shared/enum'
import { CreateLike } from '@shared/interfaces/like.interface'
import { LikeEntityRepository } from './like-entity.repository'

export class LikeEntityModel {
  constructor(
    @InjectRepository(LikeEntityRepository)
    private readonly repository: LikeEntityRepository,
    private readonly publication:PublicationEntityModel
  ) {}

  public async save(body: CreateLike) {
    try {
      await this.repository.save(body)
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500)
    }
  }

  public async userAlreadyLikePublication(
    publicationId: string,
    userId: string,
  ) {
    try {
      const res = await this.repository.findOne({
        where: { publication_id: publicationId, user_id: userId },
      })

      if (res) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500)
    }
  }

  public async validatePublicationExists(publicationId: number) {
    try {
      const res = await this.repository.findOne({
        where: { publication_id: publicationId },
      })

      if (res) {
        return true
      }

      throw new HttpException(code.NOT_FOUND, 404)
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500)
    }
  }

  public async getLike(publication_id: string, userId: string) {
    try {
      const res = await this.repository.findOne({
        where: { publication_id: publication_id, user_id: userId },
      })
      if (res) {
        return res
      }
      throw new HttpException(code.NOT_FOUND, 404)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }

  public async updateLike(id: string, body: any) {
    try {
      const res = await this.repository.update(id, body)
      if (res) {
        return res
      }
    } catch (error) {
      throw new HttpException([code.ERROR_GENERIC, message.ERROR_GENERIC], 500)
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
