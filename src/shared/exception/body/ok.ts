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
    search?:string = ''

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

    @ApiProperty({
        example:0,
        required: false,
        type: Number,
    })
    limit?:number = 0

    @ApiProperty({
        example:0,
        required: false,
        type: Number,
    })
    offset?:number = 0

    @ApiProperty({
        example:0,
        required: false,
        type: Number,
    })
    count?:number = 0

    @ApiProperty({
        example:0,
        required: false,
        type: String,
    })
    order?:string = ''

    @ApiProperty({
        example:0,
        required: false,
        type: String,
    })
    column?:string = ''

    @ApiProperty({
        example:0,
        required: false,
        type: String,
    })
    start?:string = ''

    @ApiProperty({
        example:0,
        required: false,
        type: String,
    })
    end?:string = ''
}
