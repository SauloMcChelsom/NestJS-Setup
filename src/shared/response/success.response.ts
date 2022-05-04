import {
  Injectable,
  HttpStatus,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common'

import { Observable, map } from 'rxjs'

@Injectable()
export class Success implements NestInterceptor {
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res_count) => {
        const ctx = _context.switchToHttp()
        const request = ctx.getRequest<Request>()
        const status = ctx.getResponse().statusCode
        const url = request.url.substring(request.url.lastIndexOf('?') + 1)

        let parameters:any = this.converteUrlParamsToJson(url)
     
        const {code, description, results, count, message, timestamp} = res_count
        const body = {
          results,
          statusCode: status,
          code,
          message,
          description, 
          count,
          limit: parameters.limit || 3,
          offset: parameters.offset || 0,
          order:  parameters.order ? parameters.order.toLowerCase() : 'asc',
          column:  parameters.column ? parameters.column.toLowerCase() : 'id',
          search: parameters.search || null,
          start:  parameters.start || null,
          end:    parameters.end || null,
          timestamp
        }
      
        return body
      }),
    )
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
