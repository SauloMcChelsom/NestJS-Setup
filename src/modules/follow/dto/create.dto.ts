import { IsNumber, IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateDto  {  
  @IsNumber()
  @IsNotEmpty()
  page_id: number
}



