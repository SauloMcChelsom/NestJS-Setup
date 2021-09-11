import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateNewUsuarioDto  {

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
  nome: string;

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
  @MinLength(3)
  senha: string;

  @ApiProperty({ 
    example: 'google', 
    description: 'usuario autenticou com o google ou email/senha', 
  })
  @IsNotEmpty()
  @IsString()
  providers: string;
}




const responseGetLayout =
{
  "httpStatus":400,
  "ok":{
    "result":[],
    "size":0,
    "offset":0,
    "limit":0,
  },
  "info":{
    "timestamp": "2021-09-01T12:55:04.169+0000",
    "message": "The email address is already in use by another account.",
    "code": "auth/email-already-in-use",
    "description":"",
    "path": "/api/v1/auth/sign-up",
    "method":"POST"
  },
  "error":{
    "timestamp": "2021-09-01T12:55:04.169+0000",
    "message": "The email address is already in use by another account.",
    "code": "auth/email-already-in-use",
    "description":"",
    "path": "/api/v1/auth/sign-up",
    "method":"POST"
  }
}


//offset=10&limit=5

/*

#Códigos de Status HTTP



200 OK Em requisições GET, PUT e DELETE executadas com sucesso.

201 Created
#Em requisições POST, quando um novo recurso é criado com sucesso.

400 Bad Request
#Em requisições cujas informações enviadas pelo cliente sejam invalidas.

401 Unauthorized
#Em requisições que exigem autenticação, mas seus dados não foram fornecidos.

403 Forbidden
#Em requisições que o cliente não tem permissão de acesso ao recurso solicitado.

404 Not Found
#Em requisições cuja URI de um determinado recurso seja inválida.

429 Too Many Requests
#No caso do serviço ter um limite de requisições que pode ser feita por um cliente, e ele já tiver sido atingido.

500 Internal Server Error
#Em requisições onde um erro tenha ocorrido no servidor.

503 Service Unavailable
#Em requisições feitas a um serviço que esta fora do ar, para manutenção ou sobrecarga.

*/