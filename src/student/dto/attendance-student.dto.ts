import { OmitType } from '@nestjs/swagger';
import { StudentDTO } from './index.dto';

export class AttendanceStudentDTO extends OmitType(StudentDTO, [
  'id',
  'active',
  'attendance_today',
  'expiration_date',
  'update_at',
  'password',
  'professorId',
  'active',
] as const) {}
