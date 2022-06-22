import { Injectable } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { hash, compare  } from 'bcryptjs';

import { UserMachinePropertyEntity } from '@entity/user-machine-property.entity'
import { RefreshTokenEntity } from '@entity/refresh-token.entity'
import { User } from '@shared/interfaces/user.interface'
import { RefreshToken } from '@shared/interfaces/auth.interface'
import { UserMachineProperty } from '@shared/interfaces/auth.interface'
import { code, message} from '@shared/enum'

@Injectable()
export class JwtLocalModel {

    constructor(
        @InjectRepository(RefreshTokenEntity) 
        private readonly refreshTokenEntityRepository: Repository<RefreshTokenEntity>,

        @InjectRepository(UserMachinePropertyEntity) 
        private readonly userMachinePropertyEntity: Repository<UserMachinePropertyEntity>,

        private readonly jwtService: JwtService,
    ){}

    public async generateJWT(user: User): Promise <string> {
        return await this.jwtService.signAsync({user})
    }

    public async decodeJWT(token: string){
        return await this.jwtService.decode(token)
    }
    
    public async compare(textoLegivel: string, hash: string){
        return await compare(textoLegivel, hash)
    }

    public async hashPassword(password: string) {
        return await hash(password, 12)
    }

    public async hashUiid():Promise<string>{
        return await hash(new Date().toString(), 12)
    } 

    public async comparePasswords(newPassword: string, passwortHash: string): Promise<any>{
        return await compare(newPassword, passwortHash)
    }

    public async findOneRefreshTokenByUserId(user_id:number){
        return await this.refreshTokenEntityRepository.findOne({where:{
            user_id:user_id
        }}).catch((err) => {
            throw new HttpException({
              code : 'QUERY_FAILED',
              message : `${err.detail || err.hint || err.routine}`,
            }, HttpStatus.BAD_REQUEST)
        })
    }

    public async findOneRefreshTokenByUid(uid:string){
        return await this.refreshTokenEntityRepository.findOne({where:{
            token:uid
        }}).catch((err) => {
            throw new HttpException({
              code : 'QUERY_FAILED',
              message : `${err.detail || err.hint || err.routine}`,
            }, HttpStatus.BAD_REQUEST)
        })
    }

    public async expiresRefreshTokenById(token:RefreshToken){
        return await this.refreshTokenEntityRepository.update(token.id,{
            expires_in:"0",
        }).catch((err) => {
            throw new HttpException({
              code : 'QUERY_FAILED',
              message : `${err.detail || err.hint || err.routine}`,
            }, HttpStatus.BAD_REQUEST)
        })
    }

    public async updateCredentialRefreshTokenById(id:number){
        return await this.refreshTokenEntityRepository.update(id,{
            expires_in:this.setDataTime().toString(),
            token: uuidv4()
        }).catch((err) => {
            throw new HttpException({
              code : 'QUERY_FAILED',
              message : `${err.detail || err.hint || err.routine}`,
            }, HttpStatus.BAD_REQUEST)
        })
    }

    public async createRefreshToken(user_id:number){
        await this.refreshTokenEntityRepository.save({
            user_id:user_id,
            expires_in:this.setDataTime().toString(),
        }).catch((err) => {
            throw new HttpException({
              code : 'QUERY_FAILED',
              message : `${err.detail || err.hint || err.routine}`,
            }, HttpStatus.BAD_REQUEST)
        })
    }

    private setDataTime():number{
        return new Date().setMonth(new Date().getMonth() + 1)
    }

    public async updateRefreshToken(user_id): Promise<any> {
        let refresh_token:RefreshToken = await this.findRefreshTokenByUserId(user_id)

        if(!refresh_token) {
            throw new HttpException({
                code : 'not_found',
                message : 'User not found'
            }, HttpStatus.BAD_REQUEST)
        }
        
        const expires_in = new Date(parseInt(refresh_token.expires_in))
        const toDay = new Date()

        //para não ocorrer, loga em um dispositivo e desloga no outro
        if(toDay > expires_in){
            await this.updateCredentialRefreshTokenById(refresh_token.id)
        } 
    }

    public async findRefreshTokenByUserId(user_id): Promise<RefreshToken> {
        try {

            let refreshToken = await this.findOneRefreshTokenByUserId(user_id)

            if(!refreshToken){
                throw new HttpException({
                    code : 'not found',
                    message : 'id user token refresh not found'
                }, HttpStatus.BAD_REQUEST)
            }

            return refreshToken

        } catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    public async findRefreshTokenByUID(uid): Promise<RefreshToken> {
        try {

            let refreshToken = await this.findOneRefreshTokenByUid(uid)

            if(!refreshToken){
                throw new HttpException({
                    code : 'not found',
                    message : 'uid token refresh not found'
                }, HttpStatus.BAD_REQUEST)
            }

            return refreshToken

        } catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    public async validarRefreshToken(user_id){
        let refresh_token:RefreshToken = await this.findRefreshTokenByUserId(user_id)
        this.refreshTokenIsExpires(refresh_token)
    }

    public refreshTokenIsExpires(refresh_token:RefreshToken){
        const expires_in = new Date(parseInt(refresh_token.expires_in))
        const today = new Date()

        if(today > expires_in){
            throw new HttpException({
                code:code.TOKE_EXPIRES,
                message: message.TOKE_EXPIRES,
                description: "You are passing a token that has expired, to re-access a valid token must be passed, please login with your credentials",
            }, HttpStatus.UNAUTHORIZED)
        }
    }

    public async createUserMachineProperty(property:UserMachineProperty){
        return await this.userMachinePropertyEntity.save(property).catch((err) => {
            throw new HttpException({
              code : 'QUERY_FAILED',
              message : `${err.detail || err.hint || err.routine}`,
            }, HttpStatus.BAD_REQUEST)
        })
    }

    public async updateUserMachineProperty(property:UserMachineProperty){
        return await this.userMachinePropertyEntity.update(property.id,{
            user_agent:property.user_agent,
            window_screen_color_depth:property.window_screen_color_depth,
            window_screen_pixel_depth:property.window_screen_pixel_depth,
            window_screen_height:property.window_screen_height,
            window_screen_width:property.window_screen_width
        }).catch((err) => {
            throw new HttpException({
              code : 'QUERY_FAILED',
              message : `${err.detail || err.hint || err.routine}`,
            }, HttpStatus.BAD_REQUEST)
        })
    }


    public async findOneUserMachinePropertyByUserId(user_id:number){
        try {

            const property  = await this.userMachinePropertyEntity.findOne({where: { user_id: user_id}}).catch((err) => {
                throw new HttpException({
                  code : 'QUERY_FAILED',
                  message : `${err.detail || err.hint || err.routine}`,
                }, HttpStatus.BAD_REQUEST)
            })

            if(!property){
                return <UserMachineProperty>{
                    id:null,
                    timestamp:null,
                    user_id:null,
                    user_agent: null,
                    window_screen_width: null,
                    window_screen_height: null,
                    window_screen_color_depth: null,
                    window_screen_pixel_depth: null
                }
            }

            return property

        } catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }

    public async validateRefreshToken(refresh:string, id:number){
        try {

            const refresh_token = await this.findOneRefreshTokenByUserId(id)

            if(!refresh_token) {
                throw new HttpException({
                    code : 'not_found',
                    message : 'User not found'
                }, HttpStatus.BAD_REQUEST)
            }
    
            if(refresh_token.token != refresh){
                throw new HttpException({
                    code : 'toke_diferentes',
                    message : 'toke diferentes'
                }, HttpStatus.BAD_REQUEST)
            }

        } catch (e: any) {
            throw new HttpException(e.response, e.status)
        }
    }
}