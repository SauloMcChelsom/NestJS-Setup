import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDto  {
  @IsNotEmpty() 
  @IsString()
  @MinLength(11)
  documents: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  phone: string;
}




