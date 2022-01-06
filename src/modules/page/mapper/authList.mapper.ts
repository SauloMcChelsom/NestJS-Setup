import { ReturnInterface } from '../interface/return.interface'

export class AuthListMapper {
  public toMapper(comment:ReturnInterface){
    return {
      id : comment.id,
      user_id : comment.user_id,
      page_name : comment.page_name,
      page_description : comment.page_description,
      number_of_followers : comment.number_of_followers,
      timestamp : comment.timestamp?.toString()
    }
  }
}