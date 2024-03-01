import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from 'src/users/dto/login-auth.dto';
import { RegisterDto } from '../users/dto/register-auth.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(client: Socket, loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return client.emit(
        'loginOut',
        new UnauthorizedException('Credenciales u incorrectas'),
      );
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return client.emit(
        'loginOut',
        new UnauthorizedException('Credenciales p incorrectas'),
      );
    }
    const payload = { uid: user.id };
    return client.emit('loginOut', {
      uid: user.id,
      name: user.name,
      access_token: await this.jwtService.signAsync(payload),
    });
  }

  async register(registerDto: RegisterDto) {
    const { name, email, password, role } = registerDto;
    const isUser = await this.userService.getUserByEmail(email);
    return isUser
      ? new BadRequestException('El usuario ya existe')
      : this.userService.createUser({
          id: uuidv4(),
          name,
          email,
          role,
          password: await bcryptjs.hashSync(password, 10),
        });
  }
}
