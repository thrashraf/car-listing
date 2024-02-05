import { CanActivate } from '@nestjs/common';
import { ExecutionContext, Logger } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';

export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const token = req.headers.authorization.split(' ')[1];
      return JWT.verify(token, 'thisIsASecretKey');
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
