import { ApiProperty } from '@nestjs/swagger'

export class  UserPutInfoSwagger {

    @ApiProperty({ 
        example: "202", 
        description: 'indica que a requisição foi recebida', 
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
            timestamp: new Date(),
            message: "usuarios atualizado com sucesso",
            code: 'update_user_success',
            description: null,
            path: "/user",
            method: "PUT"
        }
    })
    public info;
  
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
    public error;

}

