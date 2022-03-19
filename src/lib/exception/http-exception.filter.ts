import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { message } from '@root/src/lib/enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const res = exception.getResponse();
    const path = request.path
    const params = request.params
    const url = request.url.substring(request.url.lastIndexOf('?') + 1);

    let _description;
    let _code;
    let _message;
    let parameters:any = {}

    if (url.indexOf('=') > -1){
       parameters = JSON.parse(
        '{"' +
          decodeURI(url.replace(/&/g, '","').replace(/=/g, '":"')) +
        '"}',
      );
    }

    if (typeof res === 'object') {
      _code = res[0];
      _message = res[1];
      _description = res[2] ? res[2] : '';
    } else {
      _code = res;
      _message = message[res + ''];
      _description = '';
    }

    response.status(status).json({
      statusCode: status,
      code: _code,
      message: _message,
      description: _description,
      timestamp: new Date().toISOString(),
      path: path,
      method: request.method,
      params:params,
      offset: parameters.offset || 0,
      order:  parameters.order.toUpperCase() || 'asc',
      column: parameters.column.toLowerCase() || 'id',
      search: parameters.search || null,
      start:  parameters.start || null,
      end:    parameters.end || null,
      body: request.body,
      protocol: request.protocol,
      headers: request.headers,
    });
  }
}
