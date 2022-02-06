import { ReturnInterface } from '../interface/return.interface';

export class CreateMapper {
  public toMapper(field: ReturnInterface) {
    return {
      id: field.id,
      user_id: field.user_id,
      i_liked: field.i_liked,
      publication_id: field.publication_id,
    };
  }
}
