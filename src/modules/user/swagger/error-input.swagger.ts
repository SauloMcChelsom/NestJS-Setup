import { Contains, MinLength, MaxLength, ValidationOptions, IsDate, IsNumber, IsString, Length, IsNotEmpty, IsEmail, IsInt, Min,  Max, IsBoolean  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class  ErrorInputSwagger {

    @ApiProperty({ 
        example: "400", 
        description: 'Informa que alguns dados foram preenchidas incorretamente', 
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
            timestamp: null,
            message: null,
            code: null,
            description: null,
            path: null,
            method: null
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
            timestamp: new Date(),
            code: "property_name_minLength_pipe",
            message: "name must be longer than or equal to 3 characters",
            method: "/user",
            path: "POST",
            description: null
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

