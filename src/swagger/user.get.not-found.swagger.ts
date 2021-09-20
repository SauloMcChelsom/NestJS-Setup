import { ApiProperty } from '@nestjs/swagger'

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
        example: { 
            timestamp: new Date(),
            message: "Usuario não encontrado",
            code: 'user_not_found',
            description: null,
            path: "/user",
            method: "POST"
        }
    })
    public error;

}

