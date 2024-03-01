import {
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
// import { Socket } from 'socket.io';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
// import { UsersService } from 'src/users/users.service';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@WebSocketGateway()
export class CategoriesGateway {
  constructor(
    private readonly categoriesService: CategoriesService,
    // private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage('createCategory')
  async createCategory(
    // Carga el userID en el payload del token para poder sacarlo de ahi
    @Request() client: any,
    @MessageBody() createCategoryDto: CreateCategoryDto,
  ) {
    // const currentUser = await this.userService.getUserByEmail();
    return console.log(client['user']);
    // return this.categoriesService.createCategory(createCategoryDto);
  }

  // @SubscribeMessage('findAllCategories')
  // findAll() {
  //   return this.categoriesService.findAll();
  // }

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
