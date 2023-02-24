import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorController } from './professor.controller';
import { Professor } from './professor.entity';
import { ProfessorService } from './professor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
