import { Contains, MinLength, MaxLength, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class UpdateDto  {
  @IsNotEmpty() 
  @IsBoolean()
  eu_curti: boolean

  @IsNotEmpty() 
  @IsNumber() 
  publicacao_id: number;

  @IsNotEmpty() 
  @IsNumber()
  usuario_id: number;
}