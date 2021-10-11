import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
import { code, message } from '../../../shared/enum'
export class GetAuthVerifyIdToken404TokenInvalidSwagger extends Body {

    @ApiProperty({example: 404})
    public statusCode:any

    @ApiProperty({
        example: {
            timestamp: new Date(),
            code:code.TOKEN_INVALID,
            message:message.TOKEN_INVALID,
            description: "",
            path: "/auth/verify-id-token",
            method: "GET"
        }
    })
    error:any
}
