import { ReturnInterface } from '../interface/return.interface'

export class AuthListMapper {
  public toMapper(field:ReturnInterface){
    return {
      id : field.id,
      user_id : field.user_id,
      page_id : field.page_id,
      i_am_following : field.i_am_following,
      timestamp : field.timestamp?.toString()
    }
  }
}