import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'abcdABCD1234554321', // todo:: will get from env
        });
    }

    async validate(payload: any) {
        // This payload is the decoded token
        return { userId: payload.sub, email: payload.email };
    }
}
