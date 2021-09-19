import { 
  HttpStatus,
  HttpException
} from '@nestjs/common'

import { Responses } from './response.class'
import { Infor } from './response.interface'

export class Info extends Responses {

  constructor(info:Infor){
    super()

    info.timestamp = new Date()
    info.method = info.method ? info.method : null
    info.path = info.path ? info.path : null
    info.description = info.description ? info.description : null

    throw new HttpException({
      statusCode:HttpStatus.CREATED,
      ok:this.ok,
      info:info,
      error:this.error,
    },HttpStatus.CREATED)
  }
}