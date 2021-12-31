import { CreateInterface } from '../interface/create.interface'

export class AuthListCommentByUserIdMapper {
  public toMapper(comment:CreateInterface){
    return {
      comment : comment.comment,
      timestamp : comment.timestamp?.toString(),
      id : comment.id,
      user_id : comment.user_id,
      publication_id : comment.publication_id
    }
  }
}