import {
  Injectable,
  HttpStatus,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class HttpResponse implements NestInterceptor {
  public intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((res_count) => {
        const ctx = _context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const conf:any = request
        const status = HttpStatus.OK;
        const path = conf._parsedUrl.pathname
        const url = request.url.substring(request.url.lastIndexOf('?') + 1);

        const req = {
          rawHeaders: conf.rawHeaders,
          httpVersion: conf.httpVersion,
          keepAliveTimeout: conf.keepAliveTimeout,
          params: conf.params,
          protocol: conf.protocol,
        }

        let parameters:any = {}

        if (url.indexOf('=') > -1){
           parameters = JSON.parse(
            '{"' +
              decodeURI(url.replace(/&/g, '","').replace(/=/g, '":"')) +
            '"}',
          );
        }
 
        const body = {
          ...res_count,
          statusCode: status,
          limit: 3,
          path: path,
          method: request.method,
          req,
          offset: parameters.offset || 0,
          order:  parameters.order ? parameters.order.toLowerCase() : 'asc',
          column:  parameters.column ? parameters.column.toLowerCase() : 'id',
          search: parameters.search || null,
          start:  parameters.start || null,
          end:    parameters.end || null,
          body: request.body,
        };
        
        body.count = parseInt(body.count || 0);
        body.limit = parseInt(body.limit || 0);
        body.offset = parseInt(body.offset || 0);

        return body;
      }),
    )
  }
}
