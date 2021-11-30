import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ICurrentUser } from '../interface/current-user.interface';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();
    return user as ICurrentUser;
  },
);
