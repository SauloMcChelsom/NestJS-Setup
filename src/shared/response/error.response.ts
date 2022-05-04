import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common'
  import { Request, Response } from 'express'
  import { message as text, code as codes } from '@root/src/shared/enum'
  
  @Catch(HttpException)
  export class Error implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()
      const request = ctx.getRequest<Request>()
      const conf:any = request
      const status = exception.getStatus()
      const res:any = exception.getResponse()
      const path = conf._parsedUrl.pathname
      const url = request.url.substring(request.url.lastIndexOf('?') + 1)
      let statusCode:number = 501
      let code:string = 'INTERNAL_SERVER_ERROR'
      let message:string = 'Houve um error desconhecido'
      let description = 'Esse error não foi tratado pelo desenvolvedor e nem pelo framework'
      let parameters:any = this.converteUrlParamsToJson(url)

      //usuario não esta passando o token ou o token e invalido
      //{ statusCode: 401, message: 'Unauthorized' }
      if(res.statusCode == 401 && res.message == 'Unauthorized'){
        code = codes.TOKEN_NOT_UNAUTHORRIZED
        message = text.TOKEN_NOT_UNAUTHORRIZED
        description = 'to re-access a valid token must be passed, please login with your credentials'
        statusCode = 401
      }

      //as propriedade do browser ou nivel de acesso não permitido
      //{ statusCode: 403, message: 'Forbidden resource', error: 'Forbidden' }
      if(res.statusCode == 403 && res.message == 'Forbidden resource'){
        code = codes.USER_FORBIDDEN_RESOURCE
        message = text.USER_FORBIDDEN_RESOURCE
        description = 'to re-access a valid token must be passed, please login with your credentials'
        statusCode = 403
      }

      //Erros tratados pelo programador
      if(res.code){
        code = res.code
        message = res.message
        description = res.description
        statusCode = status
      }
  
      response.status(statusCode).json({
        statusCode: statusCode,
        code: code,
        message: message,
        description: description,
        timestamp: new Date().toISOString(),
        path: path,
        method: request.method,
        req:{
          rawHeaders: conf.rawHeaders,
          httpVersion: conf.httpVersion,
          keepAliveTimeout: conf.keepAliveTimeout,
          params: conf.params,
          protocol: request.protocol,
        },
        offset: parameters.offset || 0,
        order:  parameters.order || 'asc',
        column: parameters.column || 'id',
        search: parameters.search || null,
        start:  parameters.start || null,
        end:    parameters.end || null,
        limit:  +parameters.limit || 3,
        count:  +parameters.count || 0,
        body: request.body,
      })
    }

    /**
     * Metodo para converte uma url paramentro em objeto json
     *
     *  @param url.string > limit=5&order=id
     * 
     *  @return > { limit: '5' : order: 'id'}
     */
    private converteUrlParamsToJson(url:string):any{
      let parameters:any = {}
      if (url.indexOf('=') > -1){
        parameters = JSON.parse('{"' +decodeURI(url.replace(/&/g, '","').replace(/=/g, '":"')) + '"}',)
      }
      return parameters
    }
  }