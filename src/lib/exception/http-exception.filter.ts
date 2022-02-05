import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { message } from '@root/src/lib/enum'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const res = exception.getResponse()

    let _description
    let _code
    let _message

    if(typeof res === 'object'){
      _code = res[0]
      _message =  res[1]
      _description = res[2] ? res[2] : ''
    }else{
      _code = res
      _message = message[res+'']
      _description =  ''
    }

    response.status(status).json({
      statusCode: status,
      code: _code,
      message:_message,
      description: _description,
      path: request.url,
      method: request.method,
      body:request.body,
      file:request.file,
      protocol:request.protocol,
      headers:request.headers,
      timestamp: new Date().toISOString()
    });
  } 
}