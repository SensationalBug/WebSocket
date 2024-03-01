import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login-auth.dto';
import { RegisterDto } from '../users/dto/register-auth.dto';

@WebSocketGateway({ cors: true })
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente connectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconnectado: ${client.id}`);
  }

  @SubscribeMessage('register')
  async register(@MessageBody() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @SubscribeMessage('loginIn')
  async login(
    @ConnectedSocket() client: Socket,
    @MessageBody() loginDto: LoginDto,
  ) {
    return this.authService.login(client, loginDto);
  }
}
