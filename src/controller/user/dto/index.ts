import { MinLength, IsString, IsNotEmpty, IsEmail, IsUUID } from 'class-validator';

export class IsEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class IsUIDDTO {
  @IsNotEmpty()
  @IsUUID()
  uid: string;
}