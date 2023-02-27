import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  AttendanceStudentDTO,
  CreateStudentDTO,
  UpdateStudentDTO,
} from './DTO/student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private service: StudentService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  createStudent(@Body() student: CreateStudentDTO) {
    return this.service.create(student);
  }

  @Delete(':id')
  deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Patch()
  updateStudent(@Body() student: UpdateStudentDTO) {
    return this.service.update(student);
  }

  @Patch('attendance')
  updateStudentAttendance(@Body() student: AttendanceStudentDTO) {
    return this.service.checkAttendance(student);
  }
}
