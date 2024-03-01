import {
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  // ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BadRequestException, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
// import { UsersService } from 'src/users/users.service';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway()
export class CategoriesGateway {
  constructor(
    private readonly categoriesService: CategoriesService,
    // private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage('createCategory')
  async createCategory(
    @Request() request: any,
    @ConnectedSocket() client: Socket,
    @MessageBody() createCategoryDto: CreateCategoryDto,
  ) {
    const { categoryName, categoryIcon, isDefault } = createCategoryDto;
    const currentUser = request['user'].uid;
    return currentUser
      ? this.categoriesService.createCategory(request, client, {
          id: uuidv4(),
          isDefault,
          categoryName,
          categoryIcon,
          createdBy: currentUser,
        })
      : new BadRequestException('');
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('getAllCategories')
  async getAllCategories(
    @Request() request: any,
    @ConnectedSocket() client: Socket,
  ) {
    const cats = await this.categoriesService.getUserCategories(
      request,
      client,
    );
    return cats;
  }

  // @SubscribeMessage('findOneCategory')
  // findOne(@MessageBody() id: number) {
  //   return this.categoriesService.findOne(id);
  // }

  // @SubscribeMessage('updateCategory')
  // update(@MessageBody() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(
  //     updateCategoryDto.id,
  //     updateCategoryDto,
  //   );
  // }

  // @SubscribeMessage('removeCategory')
  // remove(@MessageBody() id: number) {
  //   return this.categoriesService.remove(id);
  // }
}
