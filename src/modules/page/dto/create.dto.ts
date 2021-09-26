import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class CreateDto  {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  descricao_da_pagina: string;


  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  nome_da_pagina: string;

  @IsNotEmpty() 
  @IsNumber()
  quantidade_de_seguidores: number

  @IsNotEmpty() 
  @IsNumber()
  usuario_id: number;
}








