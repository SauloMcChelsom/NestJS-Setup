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

import { Responses } from './response.class'
import { Error } from './response.interface'

export class Exception extends Responses {
  
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