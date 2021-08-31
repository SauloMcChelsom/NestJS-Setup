import { Contains, MinLength, MaxLength, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class UpdateDto  {
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
  usuario_id: number;
}