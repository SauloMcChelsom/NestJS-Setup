import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilityService {
    constructor(private readonly jwtService: JwtService) {}

    public decode(auth: string): {uuid: string}{
        const jwt = auth.replace('Bearer ', '');
        return this.jwtService.decode(jwt, { json: true }) as { uuid: string };
    }
}