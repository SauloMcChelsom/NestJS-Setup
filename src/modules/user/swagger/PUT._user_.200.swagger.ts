import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
export class PutUser200Swagger extends Body {

    @ApiProperty({example: 200})
    public statusCode:any

    @ApiProperty({
        example:  {
            "results": [
              {
                "uid": "5rkITHMFraPUdy2LZLbunRuZSNu1",
                "name": "ana silva",
                "email": "ana@gmail.com",
                "timestamp": "2021-09-17T09:29:06.940Z",
                "providers": "google"
              }
            ],
            "size": 1,
            "timestamp": "2021-09-26T17:19:49.275Z",
            "message": "Usuario Atualizado com sucesso",
            "code": "USER_UPDATED",
            "description": "",
            "path": "/user/5rkITHMFraPUdy2LZLbunRuZSNu1",
            "method": "PUT"
        }
    })
    ok:any
}
