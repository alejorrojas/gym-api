import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProfessorModule } from 'src/professor/professor.module';
import { Professor } from 'src/professor/professor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Professor]), ProfessorModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
