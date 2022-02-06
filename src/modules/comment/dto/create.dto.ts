import { MinLength, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsNumber()
  publication_id: number;

  @IsNotEmpty()
  @MinLength(1)
  comment: string;
}
