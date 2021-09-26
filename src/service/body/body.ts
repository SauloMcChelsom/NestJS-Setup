import  { ApiProperty } from '@nestjs/swagger'
import  { Ok, Error }  from './'

export class  Body {

    @ApiProperty({example: 401, type: Number, required: false})
    public statusCode: number
 
    @ApiProperty({type: () => Ok, required: false})
    public ok:Ok = {
        results:<any>[],
        size:0,
        timestamp: new Date(),
        message: '',
        code: '',
        description: '',
        path: '',
        method: ''
    }
  
    @ApiProperty({type: () => Error, required: false})
    public error:Error = {
        timestamp: new Date(),
        message: '',
        code: '',
        description: '',
        path: '',
        method: ''
    }
}