import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repositoy: Repository<User>,
  ) {}

  async emitClients(client: Socket) {
    return client.emit('getClients', await this.repositoy.find());
  }

  async register(client: Socket, registerAuthDto: RegisterAuthDto) {
    const { username, password } = registerAuthDto;
    await this.repositoy.save({ username, password, clientId: client.id });
    return this.emitClients(client);
  }
}
