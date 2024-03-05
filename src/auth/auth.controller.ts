import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/users/dto/register-auth.dto';
import { LoginDto } from 'src/users/dto/login-auth.dto';
import { AuthHttpGuard } from './guard/auth.http.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthHttpGuard)
  @Get('users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}
