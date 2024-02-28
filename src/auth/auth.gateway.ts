import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AuthGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente connectado: ${client.id}`);
    return this.authService.emitClients(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconnectado: ${client.id}`);
  }

  @SubscribeMessage('register')
  async register(
    @ConnectedSocket() client: Socket,
    @MessageBody() registerAuthDto: RegisterAuthDto,
  ) {
    return this.authService.register(client, registerAuthDto);
  }
}
