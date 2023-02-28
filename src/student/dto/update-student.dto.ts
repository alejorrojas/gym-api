import { PartialType } from '@nestjs/swagger';
import { StudentDTO } from './index.dto';

export class UpdateStudentDTO extends PartialType(StudentDTO) {}
