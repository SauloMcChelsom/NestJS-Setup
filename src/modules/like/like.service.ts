import { Injectable } from '@nestjs/common';

import { PublicationService } from '@modules/publication/publication.service';

import { LikeModel } from './like.model';
import { CreateInterface } from './interface/create.interface';

@Injectable()
export class LikeService {
  constructor(
    private publication: PublicationService,
    private model: LikeModel,
  ) {}

  public async create(body: CreateInterface) {
    //verificar se o usuario ja curtiu a publicacao
    const amLiking = await this.model.userAlreadyLikePublication(
      body.publication_id.toString(),
      body.user_id.toString(),
    );

    if (amLiking) {
      //se houver registro,  verifica se esta curtindo
      const segments = await this.model.getLike(
        body.publication_id.toString(),
        body.user_id.toString(),
      );

      if (segments.i_liked) {
        //se sim, atualiza para 'para de curtir' e atualizar o contator na tabela publication para --
        await this.model.updateLike(segments.id.toString(), { i_liked: false });
        await this.publication.decrementNumberLikeOfPublication(
          segments.publication_id,
        );
        return await this.model.getLike(
          body.publication_id.toString(),
          body.user_id.toString(),
        );
      } else {
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.model.updateLike(segments.id.toString(), { i_liked: true });
        await this.publication.incrementNumberLikeOfPublication(
          segments.publication_id,
        );
        return await this.model.getLike(
          body.publication_id.toString(),
          body.user_id.toString(),
        );
      }
    } else {
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      body.i_liked = true;
      await this.model.save(body);
      await this.publication.incrementNumberLikeOfPublication(
        body.publication_id.toString(),
      );
      return await this.model.getLike(
        body.publication_id.toString(),
        body.user_id.toString(),
      );
    }
  }
}
