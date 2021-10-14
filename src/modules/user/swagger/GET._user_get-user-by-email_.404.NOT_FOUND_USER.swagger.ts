import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
import { code, message } from '../../../shared/enum'
export class GetUserGetUserByEmail404NotFoundUserSwagger extends Body {

    @ApiProperty({example: 404})
    public statusCode:any

    @ApiProperty({
        example: {
            timestamp: new Date(),
            code:code.NOT_FOUND_USER,
            message:message.NOT_FOUND_USER,
            description: "",
            path: "/user/get-user-by-email/ana@mail.com",
            method: "GET"
        }
    })
    error:any
}
