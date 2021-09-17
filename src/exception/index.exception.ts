import { 
  HttpStatus,
  HttpException, 
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common'

import { Return } from './return.exception'
import { Infor, Error } from './return.interface'

export class Client extends Return {

  public OK(data:any[]){
    this.ok.results = data
    this.ok.size = data.length
    return {
      statusCode:HttpStatus.OK,
      ok:this.ok,
      info:this.info,
      error:this.error,
    }
  }

  public Info(info:Infor){
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
  
  public Exception(error:Error, status){
    error.timestamp = new Date()
    error.method = error.method ? error.method : null
    error.path = error.path ? error.path : null
    error.description = error.description ? error.description : null
    return new HttpException({
      statusCode:status,
      ok:this.ok,
      info:this.info,
      error:error,
    },status)
  }

  public ConflictException(error:Error){
    error.timestamp = new Date()
    error.method = error.method ? error.method : null
    error.path = error.path ? error.path : null
    error.description = error.description ? error.description : null
    return new ConflictException({
      statusCode:HttpStatus.CONFLICT,
      ok:this.ok,
      info:this.info,
      error:error,
    })
  }

  public InternalServerErrorException(error:Error){
    error.timestamp = new Date()
    error.method = error.method ? error.method : null
    error.path = error.path ? error.path : null
    error.description = error.description ? error.description : null
    return new InternalServerErrorException({
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      ok:this.ok,
      info:this.info,
      error:error,
    })
  }

  public ForbiddenException(error:Error){
    error.timestamp = new Date()
    error.method = error.method ? error.method : null
    error.path = error.path ? error.path : null
    error.description = error.description ? error.description : null
    return new ForbiddenException({
      statusCode:HttpStatus.FORBIDDEN,
      ok:this.ok,
      info:this.info,
      error:error,
    })
  }

  public BadRequestException(error:Error){
    error.timestamp = new Date()
    error.method = error.method ? error.method : null
    error.path = error.path ? error.path : null
    error.description = error.description ? error.description : null
    return new BadRequestException({
      statusCode:HttpStatus.BAD_REQUEST,
      ok:this.ok,
      info:this.info,
      error:error,
    })
  }

  public NotFoundException(error:Error){
    error.timestamp = new Date()
    error.method = error.method ? error.method : null
    error.path = error.path ? error.path : null
    error.description = error.description ? error.description : null
    return new NotFoundException({
      statusCode:HttpStatus.NOT_FOUND,
      ok:this.ok,
      info:this.info,
      error:error,
    })
  }

  public UnauthorizedException(error:Error){
    error.timestamp = new Date()
    error.method = error.method ? error.method : null
    error.path = error.path ? error.path : null
    error.description = error.description ? error.description : null
    return new UnauthorizedException({
      statusCode:HttpStatus.UNAUTHORIZED,
      ok:this.ok,
      info:this.info,
      error:error,
    })
  }
}