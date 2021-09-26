import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
import { code, message } from '../../../shared/enum'
export class User409EmailSwagger extends Body {

    @ApiProperty({example: 409})
    public statusCode:any

    @ApiProperty({
        example: {
            timestamp: new Date(),
            code:code.EMAIL_ALREADY_IN_USE,
            message:message.EMAIL_ALREADY_IN_USE,
            description: null,
            path: "/user",
            method: "POST"
        }
    })
    error:any
}
