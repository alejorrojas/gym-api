import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CreateProfessorDTO, UpdateProfessorDTO } from './DTO/professor.dto';
import { ProfessorService } from './professor.service';

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

  @Post()
  createProfessor(@Body() inputProfessor: CreateProfessorDTO) {
    return this.service.create(inputProfessor);
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
