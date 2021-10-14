import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
import { code, message } from '../../../shared/enum'
export class GetUserCheckUserExistsByEmail404NotFoundUserSwagger extends Body {

    @ApiProperty({example: 404})
    public statusCode:any

    @ApiProperty({
        example: {
            timestamp: new Date(),
            code:code.NOT_FOUND_USER,
            message:message.NOT_FOUND_USER,
            description: "",
            path: "/user/check-user-exists-by-email/ana@gmail.com",
            method: "GET"
        }
    })
    error:any
}
