import {
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BadRequestException, Request, UseGuards } from '@nestjs/common';
import { AuthWsGuard } from 'src/auth/guard/auth.ws.guard';
// import { UsersService } from 'src/users/users.service';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway()
export class CategoriesGateway {
  constructor(
    private readonly categoriesService: CategoriesService,
    // private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthWsGuard)
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

  @UseGuards(AuthWsGuard)
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

  @UseGuards(AuthWsGuard)
  @SubscribeMessage('updateCategory')
  updateCategory(
    @Request() request: any,
    @ConnectedSocket() client: Socket,
    @MessageBody() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService
      .updateCategory(updateCategoryDto)
      .then(async () => {
        const userCategories = await this.categoriesService.getUserCategories(
          request,
          client,
        );
        console.log(userCategories);
        client.emit('updateCategory', userCategories);
      });
  }

  // @SubscribeMessage('removeCategory')
  // remove(@MessageBody() id: number) {
  //   return this.categoriesService.remove(id);
  // }
}
