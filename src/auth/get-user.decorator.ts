import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserMetadata } from './user-metadata.interface';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserMetadata => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
