import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AuthModel } from '@model/auth/auth.model'
import { UserModel } from '@model/users/user.model'

import { CreateUser, RefreshToken, UserToken, UserMachineProperty } from '@shared/interfaces/auth.interface'
import { User } from '@shared/interfaces/user.interface'
import { Role } from '@shared/enum/role.enum'


@Injectable()
export class AuthorService {

    constructor(
        private authModel: AuthModel,
        private userModel: UserModel,
    ){}

    public async signIn(user: User): Promise<UserToken> {

        let validate_user:User = await this.userModel.validateEmailPasswordUser(user.email, user.password)
        
        let refresh_token_of_user:RefreshToken = await this.authModel.findOneRefreshTokenByUserId(validate_user.id)

        //primeiro acesso
        if(refresh_token_of_user == null){
            await this.authModel.createRefreshToken(validate_user.id)
        }else{
            await this.authModel.updateRefreshToken(refresh_token_of_user.user_id)
        }

        let refresh_token:RefreshToken = await this.authModel.findRefreshTokenByUserId(validate_user.id)
        let access_token:string = await this.authModel.generateJWT(validate_user)

        let token:UserToken = { 
            access_token: access_token,
            refresh_token:refresh_token
        }

        return token
    }

    public async createNewAccount(createUser: CreateUser) {
        await  this.userModel.validateEmailForCreateNewAccount(createUser.email)
        let passwordHash = await this.authModel.hashPassword(createUser.password)
        const user:User = {
            uid : uuidv4(),
            name : createUser.name,
            providers : 'local.com',
            email : createUser.email,
            password : passwordHash,
            role : Role.USER
        }
        return await this.userModel.create(user)
    }

    public async refreshToken(token) {
        
        let refresh_token:RefreshToken = await this.authModel.findRefreshTokenByUID(token)

        this.authModel.refreshTokenIsExpires(refresh_token)
  
        let user: User = await this.userModel.getUserById(refresh_token.user_id)

        return await this.authModel.generateJWT(user)
    }

    public async revokeToken(uid){
        let refresh_token:RefreshToken = await this.authModel.findRefreshTokenByUID(uid)
        return await this.authModel.expiresRefreshTokenById(refresh_token)
    }

    public async validarRefreshToken(user_id){
        let refresh_token:RefreshToken = await this.authModel.findRefreshTokenByUserId(user_id)
        this.authModel.refreshTokenIsExpires(refresh_token)
    }

    public async setUserMachineProperty(property:UserMachineProperty, user:User){
        user = await this.userModel.findOneUserByEmail(user.email)
        property.user_id = user.id

        
        const res:UserMachineProperty = await this.authModel.findOneUserMachinePropertyByUserId(property.user_id)

        if(res.id == null){
            await this.authModel.createUserMachineProperty(property)
        }else{
            property.id = res.id
            await this.authModel.updateUserMachineProperty(property)
        }
    }

    public async findOneUserMachineProperty(user:User){
        return await this.authModel.findOneUserMachinePropertyByUserId(user.id)
    }

    public async getUserByAccessToken(token:string): Promise<User>{
        if (token.startsWith('Bearer ') == true) {
            token = token.replace('Bearer ', '');
        }

        let res:any = await this.authModel.decodeJWT(token)

        return <User> res.user
    }

    public async validateRefreshToken(refresh:string, token:string){

        if (token.startsWith('Bearer ') == true) {
           token = token.replace('Bearer ', '');
        }
        let res:any = await this.authModel.decodeJWT(token)
        const user:User = res.user
        await this.authModel.validateRefreshToken(refresh, user.id)
    }

}
