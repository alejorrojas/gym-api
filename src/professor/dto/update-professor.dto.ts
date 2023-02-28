import { OmitType, PartialType } from '@nestjs/swagger';
import { ProfessorDTO } from './index.dto';

export class UpdateProfessorDTO extends PartialType(
  OmitType(ProfessorDTO, ['id'] as const),
) {}
