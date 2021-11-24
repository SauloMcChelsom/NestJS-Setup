import { MinLength, IsNumber, IsString, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateNewPageDto  {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  page_description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  page_name: string;
  
  @IsEmpty()
  user_id: number;

  @IsEmpty()
  number_of_followers: number

  @IsEmpty()
  id: number;
}

