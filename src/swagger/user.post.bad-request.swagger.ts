import { ApiProperty } from '@nestjs/swagger'

export class  UserPostBabRequestSwagger {

    @ApiProperty({ 
        example: "400", 
        description: 'indica que o servidor não pode ou não irá processar a requisição devido a alguma coisa que foi entendida como um erro do cliente (por exemplo, sintaxe de requisição mal formada, enquadramento de mensagem de requisição inválida ou requisição de roteamento enganosa).', 
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
            code: "property_name_minLength_pipe",
            message: "name must be longer than or equal to 3 characters",
            method: "/user",
            path: "POST",
            description: null
        }
    })
    public error;

}

