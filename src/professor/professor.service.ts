import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProfessorDTO, UpdateProfessorDTO } from './DTO/professor.dto';
import { Professor } from './professor.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  getAll() {
    return this.professorRepository.find();
  }

  async create(professor: CreateProfessorDTO) {
    if (!professor.name || !professor.password)
      return new HttpException(
        'Name and password are required',
        HttpStatus.CONFLICT,
      );

    const professorFound = await this.professorRepository.findOne({
      where: {
        name: professor.name,
      },
    });

    if (professorFound) {
      return new HttpException(
        'This username already exists',
        HttpStatus.CONFLICT,
      );
    }

    if (!professor.name || !professor.password)
      return new HttpException(
        'Name and password are required',
        HttpStatus.CONFLICT,
      );

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

  async delete(id: number) {
    const professorFound = await this.professorRepository.findOne({
      where: {
        id,
      },
    });

    if (!professorFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.professorRepository.delete({ id });
    if (result.affected) return { message: 'Delete successfully' };
  }

  async update(id: number, professor: UpdateProfessorDTO) {
    const professorFound = await this.professorRepository.findOne({
      where: {
        id,
      },
    });

    if (!professorFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const result = await this.professorRepository.update({ id }, professor);

    if (result.affected) return { message: 'Update successfully' };
  }
}
