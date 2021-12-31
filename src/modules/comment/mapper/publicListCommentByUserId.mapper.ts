import { CreateInterface } from '../interface/create.interface'

export class PublicListCommentByUserIdMapper {
  public toMapper(comment:CreateInterface){
    return {
      comment : comment.comment,
      timestamp : comment.timestamp?.toString(),
    }
  }
}