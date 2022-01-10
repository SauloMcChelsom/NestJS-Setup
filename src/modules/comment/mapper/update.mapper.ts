import { ReturnInterface } from '../interface/return.interface'

export class UpdateMapper {
  public toMapper(field:ReturnInterface){
    return {
      id : field.id,
      user_id : field.user_id,
      publication_id : field.publication_id,
      comment : field.comment,
      timestamp : field.timestamp?.toString()
    }
  }
}