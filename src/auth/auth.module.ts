import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGateway } from './auth.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { secret } from './constant/jwtConstant';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  providers: [AuthService, AuthGateway, UsersService],
})
export class AuthModule {}
