import { ApiProperty } from '@nestjs/swagger'
import { Body } from '@service/body'
export class GetAuthVerifyIdToken200Swagger extends Body {
    @ApiProperty({example: 200})
    public statusCode:any

    @ApiProperty({
        example:  {
            "results": [
                {
                    "iss": "https://securetoken.google.com/educando-brasil",
                    "aud": "educando-brasil",
                    "auth_time": 1633801183,
                    "user_id": "Q1xf0T8F0MhSYOJW5hQmUThJcni2",
                    "sub": "Q1xf0T8F0MhSYOJW5hQmUThJcni2",
                    "iat": 1633801183,
                    "exp": 1633804783,
                    "email": "ana@gmail.com",
                    "email_verified": false,
                    "firebase": {
                      "identities": {
                        "email": [
                          "ana@gmail.com"
                        ]
                      },
                      "sign_in_provider": "password"
                    },
                    "uid": "Q1xf0T8F0MhSYOJW5hQmUThJcni2"
                }
            ],
            "size": 1,
            "timestamp": "2021-09-26T17:19:49.275Z",
            "message": "",
            "code": "",
            "description": "",
            "path": "/auth/verify-id-token",
            "method": "GET"
        },
    })
    ok:any
}
