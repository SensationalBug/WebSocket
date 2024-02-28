import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGateway } from './auth.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthGateway],
})
export class AuthModule {}
