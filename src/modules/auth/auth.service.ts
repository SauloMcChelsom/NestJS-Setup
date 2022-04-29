import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { AuthModel } from './auth.model'

import { CreateUser, RefreshToken, UserToken, UserMachineProperty } from '@shared/interfaces/auth.interface'
import { User } from '@shared/interfaces/user.interface'
import { Role } from '@shared/enum/role.enum'


@Injectable()
export class AuthService {

    constructor(private model: AuthModel){}

    public async login(user: User): Promise<UserToken> {

        let validate_user:User = await this.model.validateEmailPasswordUser(user.email, user.password)
        
        let refresh_token_of_user:RefreshToken = await this.model.findOneRefreshTokenByUserId(validate_user.id)

        //primeiro acesso
        if(refresh_token_of_user == null){
            await this.model.createRefreshToken(validate_user.id)
        }else{
            await this.model.updateRefreshToken(refresh_token_of_user.user_id)
        }

        let refresh_token:RefreshToken = await this.model.findRefreshTokenByUserId(validate_user.id)
        let access_token:string = await this.model.generateJWT(validate_user)

        let token:UserToken = { 
            access_token: access_token,
            refresh_token:refresh_token
        }

        return token
    }

    public async create(createUser: CreateUser) {
        await  this.model.validateEmailForCreateNewAccount(createUser.email)
        let passwordHash = await this.model.hashPassword(createUser.password)
        const user:User = {
            uid : uuidv4(),
            name : createUser.name,
            providers : 'local.com',
            email : createUser.email,
            password : passwordHash,
            role : Role.USER
        }
        return await this.model.create(user)
    }

    public async refreshToken(token) {
        
        let refresh_token:RefreshToken = await this.model.findRefreshTokenByUID(token)

        this.model.refreshTokenIsExpires(refresh_token)
  
        let user: User = await this.model.getUser(refresh_token.user_id)

        return await this.model.generateJWT(user)
    }

    public async revokeToken(uid){
        let refresh_token:RefreshToken = await this.model.findRefreshTokenByUID(uid)
        return await this.model.expiresRefreshTokenById(refresh_token)
    }

    public async validarRefreshToken(user_id){
        let refresh_token:RefreshToken = await this.model.findRefreshTokenByUserId(user_id)
        this.model.refreshTokenIsExpires(refresh_token)
    }

    public async setUserMachineProperty(property:UserMachineProperty, user:User){
        user = await this.model.findOneUserByEmail(user.email)
        property.user_id = user.id

        
        const res:UserMachineProperty = await this.model.findOneUserMachinePropertyByUserId(property.user_id)

        if(res.id == null){
            await this.model.createUserMachineProperty(property)
        }else{
            property.id = res.id
            await this.model.updateUserMachineProperty(property)
        }
    }

    public async findOneUserMachineProperty(user:User){
        return await this.model.findOneUserMachinePropertyByUserId(user.id)
    }

    public async getUserByAccessToken(token:string): Promise<User>{
        if (token.startsWith('Bearer ') == true) {
            token = token.replace('Bearer ', '');
        }

        let res:any = await this.model.decodeJWT(token)

        return <User> res.user
    }

    public async validateRefreshToken(refresh:string, token:string){

        if (token.startsWith('Bearer ') == true) {
           token = token.replace('Bearer ', '');
        }
        let res:any = await this.model.decodeJWT(token)
        const user:User = res.user
        await this.model.validateRefreshToken(refresh, user.id)
    }

}
