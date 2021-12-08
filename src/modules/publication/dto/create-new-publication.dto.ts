import { Contains, IsEmpty, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class CreateNewPublicationDto  {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  text: string;

  @IsEmpty()
  number_of_likes: number;
  
  @IsNotEmpty() 
  @IsNumber()
  page_id: number;
}








