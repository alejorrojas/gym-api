import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStudentDTO } from './DTO/student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private service: StudentService) {}

  @Post()
  createStudent(@Body() student: CreateStudentDTO) {
    return this.service.create(student);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
