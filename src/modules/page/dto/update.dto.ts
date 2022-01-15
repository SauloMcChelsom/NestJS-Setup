import { MinLength, IsString, IsNotEmpty } from 'class-validator';

export class UpdateDto  {
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  page_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  page_description: string;
}