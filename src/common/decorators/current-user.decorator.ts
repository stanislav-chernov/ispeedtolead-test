import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Auth } from '@/common/interfaces/auth.namespace';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Auth.Request>();
    return req.user;
  }
);
