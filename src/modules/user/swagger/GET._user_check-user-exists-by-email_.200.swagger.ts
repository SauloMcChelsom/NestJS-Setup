import { ApiProperty } from '@nestjs/swagger'
import { Body } from '@service/body'
export class GetUserCheckUserExistsByEmail200Swagger extends Body {
    @ApiProperty({example: 200})
    public statusCode:any

    @ApiProperty({
        example:  {
            "results": [
              {
                "email": "ana@gmail.com",
                "providers": "google"
              }
            ],
            "size": 1,
            "timestamp": "2021-09-26T17:19:49.275Z",
            "message": "",
            "code": "",
            "description": "",
            "path": "/user/check-user-exists-by-email/ana@gmail.com",
            "method": "GET"
        },
    })
    ok:any
}
