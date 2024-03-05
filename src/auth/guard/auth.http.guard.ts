import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { secret } from '../constant/jwtConstant';
import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthHttpGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private readonly socket: Socket;

  async canActivate(context: any): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    const token = this.extractToken(bearerToken);
    if (!token) throw new UnauthorizedException();
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
