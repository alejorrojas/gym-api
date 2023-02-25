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

  @Post()
  createProfessor(@Body() inputProfessor: CreateProfessorDTO) {
    return this.service.createProfessor(inputProfessor);
  }

  @Delete(':id')
  async deleteProfessor(@Param('id', ParseIntPipe) id: number) {
    const res = await this.service.deleteProfessor(id);

    if (res.affected) return { message: 'Delete successfully' };
    return { message: 'Something went wrong :(' };
  }

  @Patch(':id')
  async updateProfessor(
    @Param('id', ParseIntPipe) id: number,
    @Body() inputProfessor: UpdateProfessorDTO,
  ) {
    const res = await this.service.updateProfessor(id, inputProfessor);

    if (res.affected) return { message: 'Update successfully' };
    return { message: 'Something went wrong :(' };
  }
}
