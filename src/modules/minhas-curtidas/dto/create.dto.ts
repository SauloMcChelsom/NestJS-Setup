import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class CreateDto  {
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








