import { ReturnInterface } from '../interface/return.interface';

export class CreateMapper {
  public toMapper(field: ReturnInterface) {
    return {
      id: field.id,
      page_id: field.page_id,
      number_of_likes: field.number_of_likes,
      number_of_comments: field.number_of_comments,
      text: field.text,
      timestamp: field.timestamp?.toString(),
    };
  }
}
