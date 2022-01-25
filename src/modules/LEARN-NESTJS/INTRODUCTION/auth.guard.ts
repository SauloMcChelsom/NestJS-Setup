import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    
    //A lógica dentro da validateRequest() 
    //função pode ser tão simples ou sofisticada quanto necessário. 
    //O ponto principal deste exemplo é mostrar como os guardas se encaixam no 
    //ciclo de solicitação/resposta.
    return this.validateRequest(request);
  }
  validateRequest(request){
    console.log(request)
    return true
  }

}