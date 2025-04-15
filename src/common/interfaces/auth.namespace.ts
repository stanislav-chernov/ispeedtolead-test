import { Request as ExpressRequest } from 'express';
import { UserDto } from '@/modules/user/dto/user.dto';

export namespace Auth {
  export interface Request extends ExpressRequest {
    user: UserDto;
  }

  export interface JwtPayload {
    sub: string;
  }
}
