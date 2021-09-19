import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class  UserCreatedSwagger {

    @ApiProperty({ 
        example: "201", 
        description: 'Codigo Status Http por metodo POST, informando que foi criado com sucesso', 
    })
    public statusCode:number
 
    
    @ApiProperty({ 
        example: { 
            results:[], 
            size:0
        }
    })
    public ok:object = {
      results:[],
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
        }
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
        }
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

