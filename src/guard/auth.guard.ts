import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';

import { config } from '../config';
import { Roles } from '../enum/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    if (
      !headers['authorization'] ||
      !headers['authorization'].toLowerCase().startsWith('bearer ')
    ) {
      return false;
    }

    const token = headers['authorization'].substr(7);

    const response = await axios.post(
      new URL('/user/verify', config.authURL).toString(),
      {
        accessToken: token,
      },
    );
    request['user'] = response.data;

    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());

    return roles.includes(request['user'].role);
  }
}
