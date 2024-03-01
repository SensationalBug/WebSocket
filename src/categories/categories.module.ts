import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesGateway } from './categories.gateway';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Category]),
  ],
  providers: [CategoriesService, CategoriesGateway, UsersService],
})
export class CategoriesModule {}
