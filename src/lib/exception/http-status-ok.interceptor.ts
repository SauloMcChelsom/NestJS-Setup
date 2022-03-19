import {
  Injectable,
  HttpStatus,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class HttpStatusOkInterceptor implements NestInterceptor {
  public intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((flow) => {
        const ctx = _context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const status = HttpStatus.OK;
        const path = request.url.slice(0, request.url.lastIndexOf('?'));
        const url = request.url.substring(request.url.lastIndexOf('?') + 1);
       const conf:any = request

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
          ...flow,
          statusCode: status,
          limit: 3,
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
        };
        
        body.count = parseInt(body.count || 0);
        body.limit = parseInt(body.limit || 0);
        body.offset = parseInt(body.offset || 0);

        return body;
      }),
    )
  }
}
