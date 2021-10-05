import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
import { code, message } from '../../../shared/enum'
export class PostUser400ProvidersUserIsInvalidSwagger extends Body {

    @ApiProperty({example: 400})
    public statusCode:any

    @ApiProperty({
        example: {
            timestamp: new Date(),
            code:code.PROVIDERS_USER_IS_INVALID,
            message:message.PROVIDERS_USER_IS_INVALID,
            description: "usuario autenticou com o google ou email/senha? example: google ou email_password",
            path: "/user",
            method: "POST"
        }
    })
    error:any
}
