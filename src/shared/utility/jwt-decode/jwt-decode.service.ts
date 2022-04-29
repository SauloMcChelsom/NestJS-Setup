import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtDecodeService {

    constructor( private  readonly jwtService: JwtService) {}

    public async decode(token){
        return await this.jwtService.decode(token)
    }
}
