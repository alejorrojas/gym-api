import { Controller, Post, Body, Delete } from '@nestjs/common';
import { CreateProfessorDTO } from './professor.dto';
import { ProfessorService } from './professor.service';

@Controller('professor')
export class ProfessorController {
  constructor(private service: ProfessorService) {}

  @Post()
  createProfessor(@Body() inputProfessor: CreateProfessorDTO) {
    return this.service.createProfessor(inputProfessor);
  }

  // @Delete()
  // deleteProfessor(@Body() name: string) {
  //   return this.deleteProfessor(name);
  // }
}
