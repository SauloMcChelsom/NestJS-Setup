import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class  NotFoundUserSwagger {

    @ApiProperty({ 
        example: "404", 
        description: 'Indica que o servidor não conseguiu encontrar o recurso solicitado', 
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
            message: "Usuario não encontrado",
            code: 'user_not_found',
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

