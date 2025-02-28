import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthProfile = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
