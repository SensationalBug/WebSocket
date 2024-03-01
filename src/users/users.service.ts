import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/users/dto/register-auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(registerDto: RegisterDto) {
    return this.userRepository.save(registerDto);
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  getUsers() {
    return this.userRepository.find();
  }
}
