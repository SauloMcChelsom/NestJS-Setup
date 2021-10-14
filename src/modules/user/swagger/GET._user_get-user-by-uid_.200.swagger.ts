import { ApiProperty } from '@nestjs/swagger'
import { Body } from '@service/body'
export class GetUserGetUserByUid200Swagger extends Body {
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
            "size": 1,
            "timestamp": "2021-09-26T17:19:49.275Z",
            "message": "",
            "code": "",
            "description": "",
            "path": "/user/get-user-by-uid/5rkITHMFraPUdy2LZLbunRuZSNu1",
            "method": "GET"
        },
    })
    ok:any
}
