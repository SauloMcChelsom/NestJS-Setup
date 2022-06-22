import { Like } from '@shared/interfaces/like.interface'

export class LikeMapper {
  public privateFindOne(field: Like) {
    return [{
      id: field.id,
      user_id: field.user_id,
      i_liked: field.i_liked,
      publication_id: field.publication_id,
    }]
  }
}
