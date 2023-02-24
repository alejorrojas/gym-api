import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProfessorDTO } from './professor.dto';
import { ProfessorService } from './professor.service';

@Controller('professor')
export class ProfessorController {
  constructor(private service: ProfessorService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  createProfessor(@Body() inputProfessor: CreateProfessorDTO) {
    return this.service.createProfessor(inputProfessor);
  }

  @Delete(':id')
  deleteProfessor(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteProfessor(id);
  }
}
