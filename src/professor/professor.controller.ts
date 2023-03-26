import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateProfessorDTO } from './dto/update-professor.dto';
import { ProfessorService } from './professor.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('professor')
@Controller('professor')
export class ProfessorController {
  constructor(private service: ProfessorService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getProfessor(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  deleteProfessor(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Patch(':id')
  updateProfessor(
    @Param('id', ParseIntPipe) id: number,
    @Body() inputProfessor: UpdateProfessorDTO,
  ) {
    return this.service.update(id, inputProfessor);
  }
}
