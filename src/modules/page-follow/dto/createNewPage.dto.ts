import { MinLength, IsNumber, IsString, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateNewPageDto  {  
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  page_id: number

  @IsEmpty()
  i_am_following: boolean;
}



