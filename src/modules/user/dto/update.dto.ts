import { MinLength, IsString, IsNotEmpty  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class UpdateDto  {

  @ApiProperty({ 
    example: 'ana', 
    description: 'Nome completo do usuario' 
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}