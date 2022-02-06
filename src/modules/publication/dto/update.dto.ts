import { MinLength, IsString, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  text: string;
}
