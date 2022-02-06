import { ReturnInterface } from '../interface/return.interface';

export class CreateMapper {
  public toMapper(field: ReturnInterface) {
    return {
      id: field.id,
      uid: field.uid,
      name: field.name,
      email: field.email,
      providers: field.providers,
      timestamp: field.timestamp,
    };
  }
}
