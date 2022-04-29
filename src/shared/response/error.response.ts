import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { message as text, code as codes } from '@root/src/shared/enum';
  
  @Catch(HttpException)
  export class Error implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const conf:any = request
      const status = exception.getStatus();
      const res:any = exception.getResponse();
      const path = conf._parsedUrl.pathname
      const url = request.url.substring(request.url.lastIndexOf('?') + 1);
      
      const req = {
        rawHeaders: conf.rawHeaders,
        httpVersion: conf.httpVersion,
        keepAliveTimeout: conf.keepAliveTimeout,
        params: conf.params,
        protocol: request.protocol,
      }
  
      let description = ''
      let code:string = 'INTERNAL_SERVER_ERROR'
      let message:string = 'http-exeption-filtro'
      let statusCode:number = 501
      let parameters:any = {}
  
      if (url.indexOf('=') > -1){
         parameters = JSON.parse(
          '{"' +
            decodeURI(url.replace(/&/g, '","').replace(/=/g, '":"')) +
          '"}',
        );
      }
  
      if(res.code){
        code = res.code;
        message = res.message;
        description = res.description
        statusCode = status || 500
      }else{
        code = codes.ERROR_GENERIC;
        message = res;
        description = ''
        statusCode = status || 500
      }
  
      response.status(statusCode).json({
        statusCode: statusCode,
        code: code,
        message: message,
        description: description,
        timestamp: new Date().toISOString(),
        path: path,
        method: request.method,
        req,
        offset: parameters.offset || 0,
        order:  parameters.order || 'asc',
        column: parameters.column || 'id',
        search: parameters.search || null,
        start:  parameters.start || null,
        end:    parameters.end || null,
        body: request.body,
      });
    }
  }