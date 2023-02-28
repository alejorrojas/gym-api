import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Professor } from 'src/professor/professor.entity';
import { ProfessorService } from 'src/professor/professor.service';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    private professorService: ProfessorService,
  ) {}

  register(data: RegisterAuthDto) {
    return this.professorService.create(data);
  }

  async login(data: LoginAuthDto) {
    const { name, password } = data;

    const professorFound = await this.professorRepository.findOne({
      where: { name },
    });

    if (!professorFound) {
      return new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    }
    const validatePassword = await compare(password, professorFound?.password);

    if (!validatePassword) {
      return new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    }

    return data;
  }
}
