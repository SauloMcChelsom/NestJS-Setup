import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserEntityModel } from '@model/user-entity/user-entity.model';
  
@ValidatorConstraint({ async: true })
export class IsEmailNotRegistered implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserEntityModel) {}

  validate(email: any) {
    return this.userRepository.findOneUserByEmail(email).then((user) => {
      return user === undefined;
    });
  }
}
  
export function EmailNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailNotRegistered,
    });
  };
}
/**
    import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
    import { EmailNotRegistered } from 'email-not-registered.pipe';

    export class UserCreateDto {
        @IsString()
        @MinLength(3)
        name: string;

        @IsEmail()
        @EmailNotRegistered({ message: 'email already registered' })
        email: string;

        @IsString()
        @MinLength(8)
        password: string;
    }
*/