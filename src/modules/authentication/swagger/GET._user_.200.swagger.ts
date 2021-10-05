import { ApiProperty } from '@nestjs/swagger'
import { Body } from '@service/body'
export class GetUser200Swagger extends Body {
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
              },
              {
                "uid": "h2g32dsdfgfgfgfh6h56dfg5gf",
                "name": "felipe",
                "email": "felipe@mail.com",
                "timestamp": "2021-09-25T22:51:54.917Z",
                "providers": "insomnia"
              }
            ],
            "size": 2,
            "timestamp": "2021-09-26T17:19:49.275Z",
            "message": "",
            "code": "",
            "description": "",
            "path": "/user",
            "method": "GET"
        },
    })
    ok:any
}
