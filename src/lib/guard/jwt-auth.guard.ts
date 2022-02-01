import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FirebaseService } from '@modules/firebase/firebase.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private firebase:FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const authorization = request.header('authorization')
    
    await this.firebase.validateTokenByFirebase(authorization)

    return true
   
  }
}