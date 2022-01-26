import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilityService {
    constructor(private readonly jwtService: JwtService) {}

    public decode(jwt: string): {uuid: string}{
        return this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    }

    public verify(jwt: string){
        return this.jwtService.verify(jwt);
    }
}