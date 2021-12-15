import { Contains, IsEmpty, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class CreateDto  {
  @IsEmpty()
  id: number;

  user_id: number;

  @IsNotEmpty() 
  @IsNumber()
  publication_id: number;
  
  @IsNotEmpty()
  @IsNotEmpty()
  @MinLength(1)
  comment: boolean;
  
}








