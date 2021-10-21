import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from '../enum/roles.enum';
import { AuthGuard } from '../guard/auth.guard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Auth(...roles: Roles[]) {
  return applyDecorators(
    SetMetadata(
      'roles',
      roles.length
        ? roles
        : [Roles.Admin, Roles.Headmaster, Roles.Manager, Roles.Passenger],
    ),
    UseGuards(AuthGuard),
  );
}
