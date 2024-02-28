import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/auth.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.104.91',
      port: 1433,
      username: 'sa',
      password: 'Sidesys0101',
      database: 'Gastaso',
      entities: [User],
      synchronize: true,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
