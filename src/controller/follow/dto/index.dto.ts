import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNumber()
  @IsNotEmpty()
  page_id: number;
}
