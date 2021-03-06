import { Injectable } from '@nestjs/common'

import { JwtLocalModel } from '@root/src/model/jwt-local/jwt-local.model'
import { UserEntityModel } from '@root/src/model/user-entity/user-entity.model'

import { CreateUserFirebase, RefreshToken, UserToken, UserMachineProperty } from '@shared/interfaces/auth.interface'
import { UserProfile } from '@shared/interfaces/firebase.interface'
import { User } from '@shared/interfaces/user.interface'
import { Role } from '@shared/enum/role.enum'


@Injectable()
export class FirebaseService {

    constructor(
        private jwtLocalModel: JwtLocalModel,
        private userModel: UserEntityModel,
    ){}

    public async signIn(user: UserProfile): Promise<UserToken> {

        
        let user_found:User = await this.userModel.getUserByUid(user.uid)
        
        let refresh_token_of_user:RefreshToken = await this.jwtLocalModel.findOneRefreshTokenByUserId(user_found.id)

        //primeiro acesso
        if(refresh_token_of_user == null){
            await this.jwtLocalModel.createRefreshToken(user_found.id)
        }else{
            await this.jwtLocalModel.updateRefreshToken(refresh_token_of_user.user_id)
        }

        await this.userModel.updateUserByUid(user_found.id,{
            last_login: new Date()
        })

        let refresh_token:RefreshToken = await this.jwtLocalModel.findRefreshTokenByUserId(user_found.id)
        let access_token:string = await this.jwtLocalModel.generateJWT(user_found)

        let token:UserToken = { 
            access_token: access_token,
            refresh_token:refresh_token
        }

        return token
    }

    public async refreshToken(token) {
        
        let refresh_token:RefreshToken = await this.jwtLocalModel.findRefreshTokenByUID(token)

        this.jwtLocalModel.refreshTokenIsExpires(refresh_token)
  
        let user: User = await this.userModel.getUserById(refresh_token.user_id)

        return await this.jwtLocalModel.generateJWT(user)
    }

    public async revokeToken(uid){
        let refresh_token:RefreshToken = await this.jwtLocalModel.findRefreshTokenByUID(uid)
        return await this.jwtLocalModel.expiresRefreshTokenById(refresh_token)
    }

    public async validarRefreshToken(user_id){
        let refresh_token:RefreshToken = await this.jwtLocalModel.findRefreshTokenByUserId(user_id)
        this.jwtLocalModel.refreshTokenIsExpires(refresh_token)
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

    public async findOneUserMachineProperty(user:User){
        return await this.jwtLocalModel.findOneUserMachinePropertyByUserId(user.id)
    }

    public async getUserByAccessToken(token:string): Promise<User>{
        if (token.startsWith('Bearer ') == true) {
            token = token.replace('Bearer ', '')
        }

        let res:any = await this.jwtLocalModel.decodeJWT(token)

        return <User> res.user
    }

    public async validateRefreshToken(refresh:string, token:string){

        if (token.startsWith('Bearer ') == true) {
           token = token.replace('Bearer ', '')
        }
        let res:any = await this.jwtLocalModel.decodeJWT(token)
        const user:User = res.user
        await this.jwtLocalModel.validateRefreshToken(refresh, user.id)
    }

}
