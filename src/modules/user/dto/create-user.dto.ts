import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class CreateUserDto  {
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

  @IsNotEmpty()
  @IsNumber()
  tipo: number;


  @IsNotEmpty()
  @IsBoolean()
  ativo: boolean;

  //@IsDate()
  //lastChangedDateTime: Date;
   
  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  cpfCnpj: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(2)
  rating: number;
}