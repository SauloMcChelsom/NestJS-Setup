import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { UserEntityModel } from '@model/user-entity/user-entity.model';
  
@ValidatorConstraint({ async: true })
export class IsUIDNotRegistered implements ValidatorConstraintInterface {
  constructor(private readonly shopRepository: UserEntityModel) {}

  validate(shopId: string) {
    return this.shopRepository.getUserByUid(shopId).then((shop) => {
      return shop !== undefined;
    });
  }

  defaultMessage(): string {
    return 'shop with this uid does not exist';
  }
}
/**
  import { Type } from 'class-transformer';
  import { IsDate, IsUUID, Validate } from 'class-validator';
  import { IsUIDNotRegistered } from 'uid-not-registered.pipe.pipe';

  export class OrderCreateDto {
    @IsUUID()
    @Validate(IsUIDNotRegistered)
    uid: string;
  }
 */