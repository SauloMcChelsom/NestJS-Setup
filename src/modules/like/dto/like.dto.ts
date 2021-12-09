import { Contains, IsEmpty, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';

export class LikeDto  {
  @IsEmpty()
  id: number;

  @IsEmpty()
  user_id: number;
  
  @IsEmpty()
  i_liked: boolean;
  
  @IsNotEmpty() 
  @IsNumber()
  publication_id: number;

}








