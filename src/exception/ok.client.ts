import {  HttpStatus } from '@nestjs/common'
import { Responses } from './response.class'

export class Ok extends Responses {

  constructor(data:any[]){
    super()
    
    this.ok.results = data
    this.ok.size = data.length
    this.statusCode = HttpStatus.OK
  }
}