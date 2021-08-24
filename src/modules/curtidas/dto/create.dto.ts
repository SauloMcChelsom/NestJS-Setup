import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class CreateDto  {
  @IsNotEmpty() 
  @IsNumber()
  quantidade_de_curtidas: number;

  @IsNotEmpty() 
  @IsNumber()
  publicacao_id: number;
}








