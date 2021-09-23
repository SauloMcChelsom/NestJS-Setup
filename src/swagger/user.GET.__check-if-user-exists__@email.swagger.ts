import { ApiProperty } from '@nestjs/swagger'

export  class UserGetCheckIfUserExistsEmailSwagger {
    @ApiProperty({ 
        example: "200", 
        description: 'Indica que a requisição foi bem sucedida', 
    })
    public statusCode;
 
    @ApiProperty({ 
        example: { 
            results:[
                {
                    "uid": "h2g32hgfh6h56dfg5gf",
                    "name": "saulo",
                    "email": "saulo@mail.com",
                    "timestamp": "2021-09-17T09:29:06.940Z",
                    "providers": "google"
                },
                {
                    "uid": "h2g32hg5656fh6h56dfg5gf",
                    "name": "maelli",
                    "email": "maelli@mail.com",
                    "timestamp": "2018-01-07T13:11:26.485Z",
                    "providers": "google"
                }
            ], 
            size:2
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