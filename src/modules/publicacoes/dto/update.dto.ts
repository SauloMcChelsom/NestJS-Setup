import { Contains, MinLength, MaxLength, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class UpdateDto  {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  texto: string;
}