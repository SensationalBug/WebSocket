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
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { LoginDto } from 'src/users/dto/login-auth.dto';
import { RegisterDto } from '../users/dto/register-auth.dto';

@WebSocketGateway({ cors: true })
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente connectado: ${client.id}`);
    // return this.authService.emitClients(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconnectado: ${client.id}`);
  }

  @SubscribeMessage('register')
  async register(
    @ConnectedSocket() client: Socket,
    @MessageBody() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @SubscribeMessage('login')
  async login(
    @ConnectedSocket() client: Socket,
    @MessageBody() loginDto: LoginDto,
  ) {
    return this.authService.login(client, loginDto);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('getClients')
  getClients(@ConnectedSocket() client: Socket, @MessageBody() data: string) {
    return this.authService.getClients(client, data);
  }
}
