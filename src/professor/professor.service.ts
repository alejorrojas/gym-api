import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessorDTO } from './professor.dto';
import { Professor } from './professor.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  async createProfessor(professor: CreateProfessorDTO) {
    // Define the expiration period
    const date = new Date();
    date.setDate(date.getDate() + 30);

    //Hash the password to save in the database
    const hashPassword = await hash(professor.password, 10);

    const normalizeProf = {
      ...professor,
      password: hashPassword,
      active: true,
      expiration_date: date,
    };
    const newProf = this.professorRepository.create(normalizeProf);
    return this.professorRepository.save(newProf);
  }

  // deleteProfessor(name: string) {
  //   return this.professorRepository.delete(name);
  // }
}
