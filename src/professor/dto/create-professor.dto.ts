import { OmitType } from '@nestjs/swagger';
import { ProfessorDTO } from './index.dto';

export class CreateProfessorDTO extends OmitType(ProfessorDTO, [
  'id',
  'active',
  'expiration_date',
] as const) {}
