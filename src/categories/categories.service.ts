import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Socket } from 'socket.io';
import { Request } from 'express';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    // private readonly usersService: UsersService,
  ) {}

  async createCategory(
    request: Request,
    client: Socket,
    createCategoryDto: CreateCategoryDto,
  ) {
    await this.categoryRepository.save(createCategoryDto);
    return this.getUserCategories(request, client);
  }

  async getUserCategories(request: Request, client: Socket) {
    const userCategories = await this.categoryRepository.findBy({
      createdBy: request['user'].uid,
    });
    return client.emit('userCats', userCategories);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
