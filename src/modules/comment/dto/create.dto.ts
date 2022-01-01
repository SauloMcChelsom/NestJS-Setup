import { MinLength,IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto  {

  
  @IsNotEmpty() 
  @IsNumber()
  publication_id: number;
  
  @ApiProperty({
    example: '10061101788',
    description: 'CPF ou CNPJ',
    required: true,
    type: String,
  })

  @IsNotEmpty()
  @MinLength(1)
  comment: string;
}








