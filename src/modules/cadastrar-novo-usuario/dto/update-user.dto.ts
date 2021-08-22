import { Contains, MinLength, MaxLength, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class UpdateUserDto  {
  @Length(10, 20)
  nome: string;

  @IsNotEmpty()
  @IsString()
  @Contains('hello')
  @MinLength(5)
  sobreNome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}