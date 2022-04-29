import { Injectable } from '@nestjs/common';

import { ClassificationInterface } from '@root/src/shared/interfaces';
//import { PublicationService } from '@modules/publication/publication.service';

import { CommentModel } from '@model/comment/comment.model';
import { UpdateComment, CreateComment } from '@shared/interfaces/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    private commentModel: CommentModel,
    //private publication: PublicationService,
  ) {}

  public async authListByUserId(id: number, cls: ClassificationInterface) {
    return await this.commentModel.listByUserId(
      id,
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async publicListByUserId(id: number, cls: ClassificationInterface) {
    return await this.commentModel.listByUserId(
      id,
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async publicListByPublicationId(
    id: number,
    cls: ClassificationInterface,
  ) {
    return await this.commentModel.listByPublicationId(
      id,
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async authFindOneById(id: number, userId: number) {
    await this.commentModel.validateID(id, userId);
    return await this.commentModel.findOneById(id);
  }

  public async publicFindOneById(id: number) {
    return await this.commentModel.findOneById(id);
  }

  public async create(body: CreateComment) {
    const create = await this.commentModel.create(body);
    /*await this.publication.incrementNumberCommentOfPublication(
      body.publication_id,
    );*/
    return await this.commentModel.findOneById(create.id);
  }

  public async update(body: UpdateComment) {
    await this.commentModel.validateID(body.id, body.user_id);
    await this.commentModel.updateById(body.id, body);
    return await this.commentModel.findOneById(body.id);
  }

  public async delete(comment_id: number, user_id: number) {
    await this.commentModel.validateID(comment_id, user_id);
    await this.commentModel.deleteById(comment_id);
  }
}
