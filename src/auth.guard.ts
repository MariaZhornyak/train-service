import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
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

    const response = await axios.post('http://localhost:3000/user/verify', {
      access_token: token,
    });
    request['userId'] = response.data.message.id;

    return true;
  }
}
