import { Injectable, HttpStatus, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common'
import { Observable, map} from 'rxjs';

@Injectable()
export class UpdateFlowInterceptor implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map(flow => {

        const ctx = _context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const status = HttpStatus.OK
        let path = request.url.slice(0, request.url.lastIndexOf("?"));
        let url = request.url.substring(request.url.lastIndexOf("?") + 1);
        const options = JSON.parse('{"' + decodeURI(url.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
        
        let body = {
            ...flow,
            statusCode: status,
            limit: 3,
            path: path,
            method: request.method,
            ...options
        }
        body.count = parseInt(body.count)
        body.limit = parseInt(body.limit)
        body.offset = parseInt(body.offset)

        return body;
      }),
    );
  }
}