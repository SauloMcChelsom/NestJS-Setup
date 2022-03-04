import { MinLength, IsNotEmpty  } from 'class-validator';

export class UpdateDto  {
  @IsNotEmpty()
  @IsNotEmpty()
  @MinLength(1)
  comment: string;
}