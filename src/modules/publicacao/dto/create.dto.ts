import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class CreateDto  {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  texto: string;

  @IsNotEmpty() 
  @IsNumber()
  pagina_id: number;
}








