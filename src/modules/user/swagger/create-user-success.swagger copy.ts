import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class  CreateUserSuccessSwagger {

    @ApiProperty({ 
        example: "201", 
        description: 'Codigo Status Http por metodo POST, informando que foi criado com sucesso', 
    })
    public statusCode:number
 
    
    @ApiProperty({ 
        example: { 
            result:[], 
            size:0
        }, 
        description: 'Para requições GET', 
    })
    public ok:object = {
      result:[],
      size:0
    }
  
    @ApiProperty({ 
        example: { 
            timestamp: new Date(),
            message: "Usuario cadastrado com sucesso",
            code: 'create_user_success',
            description: null,
            path: "/user",
            method: "POST"
        }, 
        description: 'Informe o id auth-service', 
    })
    public info = {
      timestamp: null,
      message: null,
      code: null,
      description: null,
      path: null,
      method: null
    }
  
    @ApiProperty({ 
        example: { 
            timestamp: null,
            message: null,
            code: null,
            description: null,
            path: null,
            method: null
        }, 
        description: 'Informe o id auth-service', 
    })
    public error = {
      timestamp: null,
      message: null,
      code: null,
      description: null,
      path: null,
      method: null
    }

}

