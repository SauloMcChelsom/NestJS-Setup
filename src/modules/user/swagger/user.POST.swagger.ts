import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
export class UserPostSwagger extends Body {

    @ApiProperty({example: 200})
    public statusCode:any

    @ApiProperty({
        example:  {
            "results": [
              {
                "uid": "5rkITHMFraPUdy2LZLbunRuZSNu1",
                "name": "ana",
                "email": "ana@gmail.com",
                "timestamp": "2021-09-17T09:29:06.940Z",
                "providers": "google"
              }
            ],
            "size": 2
        }
    })
    ok:any
}

