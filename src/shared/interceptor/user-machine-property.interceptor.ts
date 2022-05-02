import { Injectable, NestInterceptor, CallHandler, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { JwtLocalModel } from "@model/jwt-local/jwt-local.model"
import { UserModel } from "@root/src/model/user-common/user-common.model"
import { UserMachineProperty } from 'src/shared/interfaces/auth.interface';
import { User } from 'src/shared/interfaces/user.interface';

  @Injectable()
  export class UserMachinePropertyInterceptor implements NestInterceptor {

    constructor(
      @Inject(forwardRef(() => JwtLocalModel)) private jwtLocalModel: JwtLocalModel,
      @Inject(forwardRef(() => UserModel)) private userModel: UserModel
      ) {}

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

          await this.setUserMachineProperty(property, user)
          
          return data
        }) 
      )
    }

    public async setUserMachineProperty(property:UserMachineProperty, user:User){
      user = await this.userModel.findOneUserByEmail(user.email)
      property.user_id = user.id

      
      const res:UserMachineProperty = await this.jwtLocalModel.findOneUserMachinePropertyByUserId(property.user_id)

      if(res.id == null){
          await this.jwtLocalModel.createUserMachineProperty(property)
      }else{
          property.id = res.id
          await this.jwtLocalModel.updateUserMachineProperty(property)
      }
  }
  }