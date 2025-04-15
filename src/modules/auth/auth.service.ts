import { Injectable } from '@nestjs/common';
import { UserDto } from '@/modules/user/dto/user.dto';
import { Auth } from '@/common/interfaces/auth.namespace';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user: UserDto): string {
    const payload: Auth.JwtPayload = {
      sub: user._id,
    };
    return this.jwtService.sign(payload);
  }
}
