import { FollowInterface } from '../interface/follow.interface'

export class AuthListFollowByIdUserMapper {
  public toMapper(comment:FollowInterface){
    return {
      id : comment.id,
      user_id : comment.user_id,
      page_id : comment.page_id,
      i_am_following : comment.i_am_following,
      timestamp : comment.timestamp?.toString()
    }
  }
}