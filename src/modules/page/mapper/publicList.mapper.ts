import { ReturnInterface } from '../interface/return.interface';

export class PublicListMapper {
  public toMapper(field: ReturnInterface) {
    return {
      id: field.id,
      user_id: field.user_id,
      page_name: field.page_name,
      page_description: field.page_description,
      number_of_followers: field.number_of_followers,
      timestamp: field.timestamp?.toString(),
    };
  }
}
