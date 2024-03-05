import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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
    // Devuelve todas las categorias del user en asunto
    client.emit('AllUserCategories', userCategories);
    return userCategories;
  }

  findOneCategory(id: string) {
    return this.categoryRepository.findOneBy({ id });
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const { id } = updateCategoryDto;
    const category = await this.findOneCategory(id);

    if (!category) new BadRequestException('La categoria no existe');

    return this.categoryRepository.update(id, updateCategoryDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
