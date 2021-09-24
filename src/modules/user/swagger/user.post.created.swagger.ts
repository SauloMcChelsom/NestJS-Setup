import { ApiProperty } from '@nestjs/swagger'

export class  UserPostCreatedSwagger {

    @ApiProperty({ 
        example: "201", 
        description: 'Codigo Status Http por metodo POST, informando que foi criado com sucesso', 
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
            message: "Usuario cadastrado com sucesso",
            code: 'create_user_success',
            description: null,
            path: "/user",
            method: "POST"
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

