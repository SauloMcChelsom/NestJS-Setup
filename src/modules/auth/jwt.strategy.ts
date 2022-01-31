import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        })
    }

    async validate(payload: any): Promise<any> {
        const user = {id:'1', email:'ss@', dateOfBirth:'27/10', firstName:'ss', lastName:'sse'}
        if ( !user ) {
            throw new UnauthorizedException()
        }

        return user;
    }

}