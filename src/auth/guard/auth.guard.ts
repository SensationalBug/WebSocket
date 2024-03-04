import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { secret } from '../constant/jwtConstant';
import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private readonly socket: Socket;

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth_token = context.args[0].handshake.headers.authorization;
    console.log(request);
    const token = this.extractToken(auth_token);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(request: string): string | undefined {
    const [type, token] = request.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
