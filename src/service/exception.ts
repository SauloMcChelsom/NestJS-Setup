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

  private static _instance:OK = new OK();

  public static getInstance():OK{
    return OK._instance;
  }

  public setOptions(path:string = '', method:string = '', limit:number = 0, offset:number = 0, count:number = 0,  order:string = '', column:string = ''){
    this.ok.path = path,
    this.ok.method = method,
    this.ok.limit = limit,
    this.ok.offset = offset,
    this.ok.count = count,
    this.ok.order = order,
    this.ok.column = column
  }

  public getOptions() {
    return  {    
      path: this.ok.path || '',
      method: this.ok.method || '',
      limit: this.ok.limit || 0,
      offset: this.ok.offset || 0,
      count: this.ok.count || 0,
      order: this.ok.order || '',
      column:this.ok.column || ''
    }
  }

  constructor(results:any[]=[], code:string = '', message:string = '', description:string = ''){
    
    super()

    if(code){
      const { method, column, count, offset, order,  path, limit } = OK.getInstance().getOptions()
      this.ok.path = path,
      this.ok.method = method,
      this.ok.limit = limit,
      this.ok.offset = offset,
      this.ok.count = count,
      this.ok.order = order,
      this.ok.column = column
    } 

    this.statusCode = HttpStatus.OK
    this.ok.results = results
    this.ok.size = results.length
    this.ok.description = description 
    this.ok.message = message
    this.ok.code = code
    this.ok.timestamp = new Date()
    
  }

 





  /**
    OK.getInstance().setOptions(
      url,
      method,
      limit,
      offset,
      count,
      orderBy,
      column
    ) 
    const { path, method, limit, offset, count, order, column } = OK.getInstance().getOptions()
   */
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