import { Injectable } from '@nestjs/common';

//import { PublicationService } from '@modules/publication/publication.service'
import { ListFilter, UpdateComment, CreateComment } from '@shared/interfaces'
import { CommentEntityModel } from '@root/src/model/comment-entity/comment-entity.model'

@Injectable()
export class CommentService {
  constructor(
    private commentModel: CommentEntityModel,
    //private publication: PublicationService,
  ) {}

  public async listCommentByUserId(id: number, filter: ListFilter) {
    return await this.commentModel.listByUserId(
      id,
      filter.search,
      filter.limit,
      filter.offset,
      filter.order,
      filter.column,
      filter.start,
      filter.end,
    );
  }

  public async listCommentByPublicationId(
    id: number,
    filter: ListFilter,
  ) {
    return await this.commentModel.listByPublicationId(
      id,
      filter.search,
      filter.limit,
      filter.offset,
      filter.order,
      filter.column,
      filter.start,
      filter.end,
    );
  }

  public async findOneCommentByIdEndUserId(id: number, userId: number) {
    await this.commentModel.idEqualsUserId(id, userId);
    return await this.commentModel.findOneById(id);
  }

  public async findOneCommentById(id: number) {
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
    await this.commentModel.idEqualsUserId(body.id, body.user_id);
    await this.commentModel.updateById(body.id, body);
    return await this.commentModel.findOneById(body.id);
  }

  public async delete(comment_id: number, user_id: number) {
    await this.commentModel.idEqualsUserId(comment_id, user_id);
    await this.commentModel.deleteById(comment_id);
  }
}
