import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateNewUserDto  {

  @ApiProperty({ 
    example: '5rkITHMFraPUdy2LZLbunRuZSNu1', 
    description: 'Informe o id auth-service', 
  })
  @IsNotEmpty()
  @IsString()
  uid: string;

  @ApiProperty({ 
    example: 'ana', 
    description: 'Nome completo do usuario' 
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ 
    example: 'ana@gmail.com', 
    description: 'Digite um email', 
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123#@!',
    description: 'Uma senha forte!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @ApiProperty({ 
    example: 'google|email_password', 
    description: 'usuario autenticou com o google ou email/senha', 
  })
  @IsNotEmpty()
  @IsString()
  providers: string;
}