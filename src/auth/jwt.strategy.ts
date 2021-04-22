import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "edac5915-8dc3-476a-95b4-d2cc9f632137",
    });
  }
  async validate(payload: any) {
    console.log("PAYLOAD$$$$$$$$$$")
    console.log(payload)
    return { id: payload.sub, email: payload.email };
  }
}