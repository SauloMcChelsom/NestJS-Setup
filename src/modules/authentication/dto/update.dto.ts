import { Contains, MinLength, MaxLength, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class UpdateDto  {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsBoolean()
  emailVerified: boolean

  @IsNotEmpty()
  @IsString()
  password: string

  @IsString()
  phoneNumber: string

  @IsString()
  displayName: string

  @IsString()
  photoURL: string

  @IsBoolean()
  disabled: boolean
}