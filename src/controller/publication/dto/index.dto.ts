import { MinLength, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  text: string;

  @IsNotEmpty()
  @IsNumber()
  page_id: number;
}

export class UpdateDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    text: string;
  }
  