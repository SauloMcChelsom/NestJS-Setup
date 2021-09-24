import { ApiProperty } from '@nestjs/swagger'
import { Error } from './user.get.ok.swagger'
export class  UserGetNotFoundSwagger {

    @ApiProperty({ 
        example: "404", 
        description: 'Indica que o servidor não conseguiu encontrar o recurso solicitado', 
    })
    public statusCode;
 
    
    @ApiProperty({ 
        example: { 
            results:[], 
            size:0
        }
    })
    public ok;
  
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
    public info;
  
    @ApiProperty({
        required: true,
        type: Error,
    })
    public error:Error;

}

