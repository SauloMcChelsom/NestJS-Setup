import { ApiProperty } from '@nestjs/swagger'

export class Ok {

    @ApiProperty({
        example:[],
        required: false,
        type: Array,
    })
    results:any[] = []

    @ApiProperty({
        example:0,
        required: false,
        type: Number,
    })
    size:number = 0

    @ApiProperty({
        example: new Date(),
        required: false,
        type: Date,
    })
    timestamp?: Date = new Date()

    @ApiProperty({
        example: null,
        required: false,
        type: String,
    })
    message:string = ''

    @ApiProperty({
        example:null,
        required: false,
        type: String,
    })
    code:string = ''

    @ApiProperty({
        example:null,
        required: false,
        type: String,
    })
    description?:string = ''

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
    method?:string = ''
}
