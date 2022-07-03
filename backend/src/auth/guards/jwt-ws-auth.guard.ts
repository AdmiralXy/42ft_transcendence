import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../app/decorators/skip-auth.decorator';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class JwtWsAuthGuard implements CanActivate {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      context.switchToHttp().getRequest().user = this.jwtService.verify(
        client.handshake.headers.authorization.split(' ')[1],
      ) as any;
    } catch (e) {
      return false;
    }
    return true;
  }
}
