import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ICurrentUser } from './current-user.interface';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return { id: request.userId } as ICurrentUser;
  },
);
