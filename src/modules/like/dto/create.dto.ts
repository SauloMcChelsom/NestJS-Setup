import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsNumber()
  publication_id: number;
}
