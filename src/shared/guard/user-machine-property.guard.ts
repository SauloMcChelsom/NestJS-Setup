import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { User } from "src/shared/interfaces/user.interface";
import { UserMachineProperty } from "src/shared/interfaces/auth.interface";

@Injectable()
export class UserMachinePropertyGuard implements CanActivate {
    constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();        
        const binding = request[Object.getOwnPropertySymbols(request)[1]]
        const accessToken = request[Object.getOwnPropertySymbols(request)[1]]

        const user: User = await this.authService.getUserByAccessToken(accessToken.authorization)
        
        let property:UserMachineProperty = {
            user_agent: binding['user-agent'] || null,
            window_screen_width: binding.window_screen_width || null,
            window_screen_height: binding.window_screen_height || null,
            window_screen_color_depth: binding.window_screen_color_depth || null,
            window_screen_pixel_depth: binding.window_screen_pixel_depth || null,
        }

        let getProperty:UserMachineProperty = await this.authService.findOneUserMachineProperty(user)
        const { id, timestamp, user_id, ...result} = getProperty;
        
        return  this.isEquivalent(property, result)
    }

    public isEquivalent(a, b):boolean {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
    
        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }
    
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
    
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
    
        // If we made it this far, objects
        // are considered equivalent
        return true;
    }
}