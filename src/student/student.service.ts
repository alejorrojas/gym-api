import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { ProfessorService } from 'src/professor/professor.service';
import { Repository } from 'typeorm';
import { AttendanceStudentDTO } from './dto/attendance-student.dto';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private professorService: ProfessorService,
  ) {}

  /**
   * Get all the students
   *
   * Additionally sets the student's "attendance_today" property to false if is a new calendar day
   */
  async getAll() {
    const now = new Date();
    const students = await this.studentRepository.find();

    //Verify if is a new day in order to reset attendance
    for (const student of students) {
      if (this.isNewDay(student.update_at, now)) {
        await this.setNewDay(student);
      }
    }
    return students;
  }

  /**
   * Update a student's "attendance_today" property
   *@param {Student} student - used to find and update the record
   */
  setNewDay(student: Student) {
    return this.studentRepository.update(
      { id: student.id },
      { attendance_today: false },
    );
  }

  /**
   * Creates a new student
   *@param {CreateStudentDTO} student - body required to create the new record
   */
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

  /**
   * Update a student
   *@param {UpdateStudentDTO} student - update payload
   */
  async update(student: UpdateStudentDTO) {
    const studentFound = await this.studentRepository.findOne({
      where: {
        id: student.id,
      },
    });

    if (!studentFound) {
      return new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.studentRepository.update(
      { id: student.id },
      student,
    );

    if (result.affected) return { message: 'Update successfully' };
    else
      return new HttpException(
        'Sorry, we could not update the student info',
        HttpStatus.CONFLICT,
      );
  }

  /**
   * Delete a student
   *@param {number} id - used to find and delete the record
   */
  async delete(id: number) {
    const result = await this.studentRepository.delete({ id });

    if (!result.affected) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'Delete successfully' };
  }

  /**
   * Check if the student's membership is no longer valid
   *@param {Date} expirationDate
   */
  isExpired(expirationDate: Date) {
    const dateNow = new Date();
    if (dateNow > expirationDate) return true;
    return false;
  }

  /**
   * Sets the student membership's state to no longer valid
   *
   * Define the "active" property to false
   * @param {string} name - used to find and update the record
   */
  async updateExpiration(name: string) {
    const dateNow = new Date();
    const result = await this.studentRepository.update(
      { name },
      { active: false, attendance_today: false, update_at: dateNow },
    );

    if (result.affected)
      return new HttpException(
        `${name}'s membership has already expired`,
        HttpStatus.FORBIDDEN,
      );
  }

  /**
   * Check if is a new calendar day comparing two dates
   * @param {Date} start - the "lower" date
   * @param {Date} end - the "higher" date
   */
  isNewDay(start: Date, end: Date) {
    const dayStart = start.getDate();
    const dayEnd = end.getDate();
    const monthStart = start.getMonth();
    const monthEnd = end.getMonth();

    if (dayEnd > dayStart || monthEnd > monthStart) return true;
    return false;
  }

  /**
   * Update the student's "attendance_today" property
   *
   * Manages the entire process of taking attendance
   * @param {AttendanceStudentDTO} student - used to find and update the record
   */
  async checkAttendance(student: AttendanceStudentDTO) {
    const now = new Date();

    //Verify if the student exits
    const studentFound = await this.studentRepository.findOne({
      where: {
        name: student.name,
      },
    });

    if (!studentFound) {
      return new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    //Verify student membership's expiration date
    if (this.isExpired(studentFound.expiration_date)) {
      this.updateExpiration(student.name);
    }

    //Verify if is a new day in order to reset attendance
    if (this.isNewDay(studentFound.update_at, now)) {
      studentFound.attendance_today = false;
    }

    //Verify student's attendance
    if (studentFound.attendance_today) {
      return new HttpException(
        `Sorry, ${student.name} has already attended today`,
        HttpStatus.FORBIDDEN,
      );
    }

    //Update student attendance
    const result = await this.studentRepository.update(
      { name: student.name },
      { attendance_today: true, update_at: now },
    );

    if (result.affected)
      return { message: `${student.name}'s attendance check successfully` };
    else
      return new HttpException(
        'Sorry, we could not update the student info',
        HttpStatus.CONFLICT,
      );
  }
}
