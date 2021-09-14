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
      statusCode:HttpStatus.OK,//  200 OK Em requisições GET executadas com sucesso.
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
      statusCode:HttpStatus.CREATED,//201 Created - Em requisições POST, PUT e DELETE quando um novo recurso é criado com sucesso.
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

  private statusCode:number = 0

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