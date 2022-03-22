import { ReturnInterface } from '../interface/return.interface';

export class PublicListCommentByUserIdMapper {
  public toMapper(comment: ReturnInterface) {
    return {
      comment: comment.comment,
      timestamp: comment.timestamp.toString(),
    };
  }
}
