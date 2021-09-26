import { ApiProperty } from '@nestjs/swagger'

export class Error {

    @ApiProperty({
        example: new Date(),
        required: false,
        type: Date,
    })
    timestamp?: Date

    @ApiProperty({
        example: null,
        required: false,
        type: String,
    })
    message:String = ''

    @ApiProperty({
        example:null,
        required: false,
        type: String,
    })
    code:String = ''

    @ApiProperty({
        example:null,
        required: false,
        type: String,
    })
    description?:String = ''

    @ApiProperty({
        example:null,
        required: false,
        type: String,
    })
    path?:string = ''

    @ApiProperty({
        example:null,
        required: false,
        type: String,
    })
    method?:String = ''
  
}