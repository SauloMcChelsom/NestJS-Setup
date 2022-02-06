import { MinLength, IsString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  page_description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  page_name: string;
}
