import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerProfessor(@Body() data: LoginAuthDto) {
    return this.authService.register(data);
  }
  @Post('login')
  loginProfessor(@Body() data: RegisterAuthDto) {
    return this.authService.login(data);
  }
}
