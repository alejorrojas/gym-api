import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AttendanceStudentDTO } from './dto/attendance-student.dto';
import { CreateStudentDTO } from './dto/create-student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { StudentService } from './student.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('students')
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
