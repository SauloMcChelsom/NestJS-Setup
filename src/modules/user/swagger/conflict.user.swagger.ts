import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class  ConflictUserSwagger {

    @ApiProperty({ 
        example: "409", 
        description: 'Indica que a solicitação atual conflitou com o recurso que está no servidor', 
    })
    public statusCode:number
 
    
    @ApiProperty({ 
        example: { 
            result:[], 
            size:0
        }, 
    })
    public ok:object = {
      result:[],
      size:0
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
            timestamp: new Date(),
            message: "Email já existe",
            code: 'email_already_exists',
            description: null,
            path: "/user",
            method: "POST"
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

