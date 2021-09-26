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
  
import  { Ok, Error, Body }  from './body/'

export class OK extends Body {
  constructor(results:any[], code:string = '', message:string = '', description:string = ''){
    super()
    this.statusCode = HttpStatus.OK
    this.ok.results = results
    this.ok.size = results.length
    this.ok.description = description 
    this.ok.message = message
    this.ok.code = code
    this.ok.timestamp = new Date()
  }
}

export class Exception extends Body {
  constructor(error:Error, status: number){
    super()

    error.timestamp = new Date()
    error.method = error.method ? error.method : ''
    error.path = error.path ? error.path : ''
    error.description = error.description ? error.description : ''

    throw new HttpException({
      statusCode:status,
      ok:this.ok,
      error:error,
    },status)
  }
}

export class ConflictExceptions extends Body {
  constructor (error:Error){
    super()

    error.timestamp = new Date()
    error.method = error.method ? error.method : ''
    error.path = error.path ? error.path : ''
    error.description = error.description ? error.description : ''
    throw new ConflictException({
      statusCode:HttpStatus.CONFLICT,
      ok:this.ok,
      error:error,
    })
  }
}

export class InternalServerErrorExceptions extends Body {
  constructor(error:Error){
    super()

    error.timestamp = new Date()
    error.method = error.method ? error.method : ''
    error.path = error.path ? error.path : ''
    error.description = error.description ? error.description : ''
    throw new InternalServerErrorException({
      statusCode:HttpStatus.INTERNAL_SERVER_ERROR,
      ok:this.ok,
      error:error,
    })
  }
}

export class ForbiddenExceptions extends Body {
  constructor(error:Error){
    super()

    error.timestamp = new Date()
    error.method = error.method ? error.method : ''
    error.path = error.path ? error.path : ''
    error.description = error.description ? error.description : ''
    throw new ForbiddenException({
      statusCode:HttpStatus.FORBIDDEN,
      ok:this.ok,
      error:error,
    })
  }
}

export class BadRequestExceptions extends Body {
  constructor(error:Error){

    super()
    error.timestamp = new Date()
    error.method = error.method ? error.method : ''
    error.path = error.path ? error.path : ''
    error.description = error.description ? error.description : ''
    throw new BadRequestException({
      statusCode:HttpStatus.BAD_REQUEST,
      ok:this.ok,
      error:error,
    })
  }
}

export class NotFoundExceptions extends Body {
  constructor(error:Error){
    super()

    error.timestamp = new Date()
    error.method = error.method ? error.method : ''
    error.path = error.path ? error.path : ''
    error.description = error.description ? error.description : ''
    throw new NotFoundException({
      statusCode:HttpStatus.NOT_FOUND,
      ok:this.ok,
      error:error,
    })
  }
}

export class UnauthorizedExceptions extends Body {
  constructor(error:Error){
    super()

    error.timestamp = new Date()
    error.method = error.method ? error.method : ''
    error.path = error.path ? error.path : ''
    error.description = error.description ? error.description : ''
    throw new UnauthorizedException({
      statusCode:HttpStatus.UNAUTHORIZED,
      ok:this.ok,
      error:error,
    })
  }
}