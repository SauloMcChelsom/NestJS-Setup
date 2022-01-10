import { IsNumber, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateDto  {  
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  page_id: number

  @IsEmpty()
  i_am_following: boolean;
}



