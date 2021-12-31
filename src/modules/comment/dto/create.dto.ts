import { Contains, IsEmpty, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class CreateDto  {
  @IsNotEmpty() 
  @IsNumber()
  publication_id: number;
  
  @IsNotEmpty()
  @MinLength(1)
  comment: string;
}








