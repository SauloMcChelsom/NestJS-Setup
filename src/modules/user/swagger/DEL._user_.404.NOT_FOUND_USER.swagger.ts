import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
import { code, message } from '../../../shared/enum'
export class DelUser404NotFoundUserSwagger extends Body {

    @ApiProperty({example: 404})
    public statusCode:any

    @ApiProperty({
        example: {
            timestamp: new Date(),
            code:code.NOT_FOUND_USER,
            message:message.NOT_FOUND_USER,
            description: "",
            path: "/user/5rkITHMFraPUdy2LZLbunRuZSNu1",
            method: "DELETE"
        }
    })
    error:any
}
