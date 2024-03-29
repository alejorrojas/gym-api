import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { Professor } from './professor.entity';
import roles from 'src/roles/roles.types';
import { CreateProfessorDTO } from './dto/create-professor.dto';
import { UpdateProfessorDTO } from './dto/update-professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
  ) {}

  /**
   * Get all the professors
   */
  getAll() {
    return this.professorRepository.find({ relations: ['students'] });
  }

  /**
   * Find a professor's information
   * @param {number} id - used to find the record
   */
  findOne(id: number) {
    return this.professorRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }

  /**
   * Create a professor
   * @param {CreateProfessorDTO} professor - body required to create the new record
   */
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
      role: roles.professor,
    };
    const newProf = this.professorRepository.create(normalizeProf);
    return this.professorRepository.save(newProf);
  }

  /**
   * Delete a professor
   * @param {number} id - used to find and delete the record
   */
  async delete(id: number) {
    const result = await this.professorRepository.delete({ id });

    if (!result.affected) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'Delete successfully' };
  }

  /**
   * Delete a professor
   * @param {number} id - used to find and update the record
   * @param {UpdateProfessorDTO} professor - update payload
   */
  async update(id: number, professor: UpdateProfessorDTO) {
    if (!professor) {
      return new HttpException(
        'Attributes and values to modify are required',
        HttpStatus.CONFLICT,
      );
    }

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
