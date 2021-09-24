import { ApiProperty } from '@nestjs/swagger'

export class  UserPostConflictSwagger {

    @ApiProperty({ 
        example: "409", 
        description: 'Indica que a solicitação atual conflitou com o recurso que está no servidor', 
    })
    public statusCode;
 
    
    @ApiProperty({ 
        example: { 
            results:[], 
            size:0
        }, 
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
            message: "Email já existe",
            code: 'email_already_exists',
            description: null,
            path: "/user",
            method: "POST"
        }
    })
    public error;

}

