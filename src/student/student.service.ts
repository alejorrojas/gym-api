import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { ProfessorService } from 'src/professor/professor.service';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './DTO/student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private professorService: ProfessorService,
  ) {}

  getAll() {
    return this.studentRepository.find({ relations: ['professor'] });
  }

  async create(student: CreateStudentDTO) {
    const professorFound = await this.professorService.findOne(
      student.professorId,
    );

    if (!professorFound) {
      return new HttpException('Professor not found', HttpStatus.NOT_FOUND);
    }

    const studentFound = await this.studentRepository.findOne({
      where: {
        name: student.name,
      },
    });

    if (studentFound) {
      return new HttpException(
        'This username already exists',
        HttpStatus.CONFLICT,
      );
    }
    // Define the expiration period
    const date = new Date();
    date.setDate(date.getDate() + 30);

    //Hash the password to save in the database
    const hashPassword = student.password
      ? await hash(student.password, 10)
      : '';

    const normalizeStudent = {
      ...student,
      password: hashPassword,
      active: true,
      expiration_date: date,
    };
    const newStudent = this.studentRepository.create(normalizeStudent);
    return this.studentRepository.save(newStudent);
  }
}
