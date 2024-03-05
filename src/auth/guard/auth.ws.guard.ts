import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { secret } from '../constant/jwtConstant';
import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthWsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private readonly socket: Socket;

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = context.args[0].handshake.headers.authorization;
    // const token = this.extractToken(bearerToken);
    if (!bearerToken) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(bearerToken, {
        secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
