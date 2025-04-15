import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { Env } from '@/config/env';
import { UserService } from '@/modules/user/user.service';
import { Auth } from '@/common/interfaces/auth.namespace';
import { UserDto } from '@/modules/user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')!,
    });
  }

  async validate(payload: Auth.JwtPayload): Promise<UserDto> {
    return this.userService.getById(payload.sub);
  }
}
