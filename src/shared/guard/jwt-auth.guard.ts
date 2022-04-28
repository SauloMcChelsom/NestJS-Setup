import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'
import { User } from '@shared/interfaces/user.interface'

import { JwtAuthGuard as JwtAuthGuards } from './jwt-guard'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private user: UserService,
    private firebase: FirebaseService,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
   
    const request = context.switchToHttp().getRequest()

    const authorization = request.header('authorization')

    let res:any = await this.jwtService.decode(authorization)

    if(!res){
      return false
    }

    let email = null

    if(res.email){
      email = res.email
    }

    const user:User =  await this.user.publicFindOneByEmail(email)

    if(!user){
      return false
    }

    if(user.providers == 'local.com'){
      new JwtAuthGuards()
      console.log('local.com')
    }

    if(user.providers == 'google.com'){
      await this.jwtGoogleSignInWithPopup(authorization)
    }
    console.log('error not local.com ou google.com \n jwt-auth.guard.ts')
    return false
  }

  public jwtLocalSignInWithEmailAndPassword(token:string){

  }

  public async jwtGoogleSignInWithPopup(token:string){
    await this.firebase.validateTokenByFirebase(token);
    return true;
  }

  public jwtGoogleSignInWithEmailAndPassword(token:string){

  }
  
}
