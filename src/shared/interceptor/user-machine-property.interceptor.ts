import { Injectable, NestInterceptor, CallHandler, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { AuthService } from "@root/src/controller/auth/auth.service";
import { UserMachineProperty } from 'src/shared/interfaces/auth.interface';
import { User } from 'src/shared/interfaces/user.interface';

  @Injectable()
  export class UserMachinePropertyInterceptor implements NestInterceptor {

    constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService) {}

    public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map( async(data) => {

          const ctx = _context.switchToHttp();
          const request = ctx.getRequest<Request>();
          const req:any = request
          
          const user: User = {
            email:req.body.email
          }

          const binding = request[Object.getOwnPropertySymbols(request)[1]]
      
          let property:UserMachineProperty = {
            user_agent: binding['user-agent'] || null,
            window_screen_width: binding.window_screen_width || null,
            window_screen_height: binding.window_screen_height || null,
            window_screen_color_depth: binding.window_screen_color_depth || null,
            window_screen_pixel_depth: binding.window_screen_pixel_depth || null,
          }

          await this.authService.setUserMachineProperty(property, user)
          
          return data
        }) 
      )
    }
  }