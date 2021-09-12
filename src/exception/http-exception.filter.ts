import { 
  HttpStatus,
  HttpException, 
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
  NotAcceptableException,
  RequestTimeoutException,
  ConflictException,
  GoneException,
  HttpVersionNotSupportedException,
  PayloadTooLargeException,
  UnsupportedMediaTypeException,
  UnprocessableEntityException,
  InternalServerErrorException,
  NotImplementedException,
  ImATeapotException,
  MethodNotAllowedException,
  BadGatewayException,
  ServiceUnavailableException,
  GatewayTimeoutException,
  PreconditionFailedException
} from '@nestjs/common'

export class Client {

  public OK(data:any[]){
    this.ok.result = data
    this.ok.size = data.length
    return {
      httpStatus:HttpStatus.OK,
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
      httpStatus:HttpStatus.CREATED,
      ok:this.ok,
      info:info,
      error:this.error,
    },HttpStatus.CREATED)
  }
  
  public HttpException(error:Error, status){
    error.timestamp = new Date()
    error.method = error.method ? error.method : null
    error.path = error.path ? error.path : null
    error.description = error.description ? error.description : null
    return new HttpException({
      httpStatus:status,
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
      httpStatus:HttpStatus.CONFLICT,
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
      httpStatus:HttpStatus.INTERNAL_SERVER_ERROR,
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
      httpStatus:HttpStatus.FORBIDDEN,
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
      httpStatus:HttpStatus.BAD_REQUEST,
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
      httpStatus:HttpStatus.NOT_FOUND,
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
      httpStatus:HttpStatus.UNAUTHORIZED,
      ok:this.ok,
      info:this.info,
      error:error,
    })
  }

  private httpStatus:number = 0

  private ok = {
    result:[],
    size:0
  }

  private info = {
    timestamp: null,
    message: null,
    code: null,
    description: null,
    path: null,
    method: null
  }

  private error = {
    timestamp: null,
    message: null,
    code: null,
    description: null,
    path: null,
    method: null
  }
}

export enum code {
  EMAIL_ALREADY_IN_USE = "EMAIL_ALREADY_IN_USE",
}
export enum message {
  EMAIL_ALREADY_IN_USE = "Este e-mail esta sendo usando por outro usuario",
}


interface Ok {
  result:object
  size?:number
}

interface Infor {
  timestamp?: Date
  message: string
  code: string
  description?: string
  path?: string
  method?: string
}

interface Error {
  timestamp?: Date
  message: string
  code: string
  description?: string
  path?: string
  method?: string
}