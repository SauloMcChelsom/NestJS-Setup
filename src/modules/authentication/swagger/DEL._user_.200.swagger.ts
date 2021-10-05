import { ApiProperty } from '@nestjs/swagger'
import { Body } from '../../../service/body'
export class DelUser200Swagger extends Body {

    @ApiProperty({example: 200})
    public statusCode:any

    @ApiProperty({
        example:  {
            "results": [],
            "size": 0,
            "timestamp": "2021-09-26T17:19:49.275Z",
            "message": "Execução deletado com sucesso",
            "code": "DELETED_SUCCESSFULLY",
            "description": "",
            "path": "",
            "method": ""
        }
    })
    ok:any
}

