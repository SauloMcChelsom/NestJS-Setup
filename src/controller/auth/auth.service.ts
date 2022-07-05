import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { JwtLocalModel } from '@root/src/model/jwt-local/jwt-local.model'
import { UserEntityModel } from '@root/src/model/user-entity/user-entity.model'

import { CreateUser, RefreshToken, UserToken, UserMachineProperty, CreateUserGoogleProvider } from '@shared/interfaces/auth.interface'
import { User } from '@shared/interfaces/user.interface'
import { Role } from '@shared/enum/role.enum'


@Injectable()
export class AuthService {

    constructor(
        private jwtLocalModel: JwtLocalModel,
        private userModel: UserEntityModel,
    ){}

    public async getUserByUid(uid:string){ 0
       return await this.userModel.getUserByUid(uid)
    }

    public async activeAccount(user){
        await this.userModel.updateUserByUid(user.id,{
            providers:'google.com',
            last_login: new Date(),
            is_active: !user.is_active,
            password: await this.jwtLocalModel.hashPassword(new Date().toString())
        })
    }

    public async signIn(user: User): Promise<UserToken> {

        let validate_user:User = await this.userModel.validateEmailPasswordUser(user.email, user.password)
        
        let refresh_token_of_user:RefreshToken = await this.jwtLocalModel.findOneRefreshTokenByUserId(validate_user.id)

        //primeiro acesso
        if(refresh_token_of_user == null){
            await this.jwtLocalModel.createRefreshToken(validate_user.id)
        }else{
            await this.jwtLocalModel.updateRefreshToken(refresh_token_of_user.user_id)
        }

        await this.userModel.updateUserByUid(validate_user.id,{
            last_login: new Date()
        })

        let refresh_token:RefreshToken = await this.jwtLocalModel.findRefreshTokenByUserId(validate_user.id)
        let access_token:string = await this.jwtLocalModel.generateJWT(validate_user)

        let token:UserToken = { 
            access_token: access_token,
            refresh_token:refresh_token
        }

        return token
    }

    public async createNewAccountWithGoogleAuthProvider(createUser: CreateUserGoogleProvider) {
        await  this.userModel.validateEmailForCreateNewAccount(createUser.email)
        createUser.password = await this.jwtLocalModel.hashPassword(createUser.password)
        const user = {
            ...createUser,
            role : Role.USER,
            last_login: new Date(),
            is_active: true,
            updated_at: null
        }
        return await this.userModel.create(user)
    }

    public async createNewAccountWithGoogleEmailPassword(createUser: CreateUserGoogleProvider) {
        await  this.userModel.validateEmailForCreateNewAccount(createUser.email)
        createUser.password = await this.jwtLocalModel.hashPassword(createUser.password)
        const user = {
            ...createUser,
            role : Role.USER,
            last_login: null,
            is_active: false,
            updated_at: null
        }
        return await this.userModel.create(user)
    }

    public async createNewAccount(createUser: CreateUser) {
        await  this.userModel.validateEmailForCreateNewAccount(createUser.email)
        let passwordHash = await this.jwtLocalModel.hashPassword(createUser.password)
        const user:User = {
            uid : uuidv4(),
            name : createUser.name,
            providers : 'local.com',
            email : createUser.email,
            password : passwordHash,
            role : Role.USER,
            last_login: null,
            is_active: false,
            updated_at: null
        }
        return await this.userModel.create(user)
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
            token = token.replace('Bearer ', '');
        }

        let res:any = await this.jwtLocalModel.decodeJWT(token)

        return <User> res.user
    }

    public async validateRefreshToken(refresh:string, token:string){

        if (token.startsWith('Bearer ') == true) {
           token = token.replace('Bearer ', '');
        }
        let res:any = await this.jwtLocalModel.decodeJWT(token)
        const user:User = res.user
        await this.jwtLocalModel.validateRefreshToken(refresh, user.id)
    }

}
