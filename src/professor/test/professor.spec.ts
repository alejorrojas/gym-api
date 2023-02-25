// import { Test, TestingModule } from '@nestjs/testing';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProfessorController } from '../professor.controller';
// import { Professor } from '../professor.entity';
// import { ProfessorService } from '../professor.service';

// describe('Professor Controller', () => {
//   let professorController: ProfessorController;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       imports: [TypeOrmModule.forFeature([Professor])],
//       controllers: [ProfessorController],
//       providers: [ProfessorService],
//     }).compile();

//     professorController = app.get<ProfessorController>(ProfessorController);
//   });

//   describe('Routes', () => {
//     describe('Get', () => {
//       it('should return "Hello World!"', () => {
//         const result = [{ name: 'Lucho', password: 'lol' }];
//         jest.spyOn(ProfessorService, 'getAll').mockImplementation(() => result);
//         expect(professorController.getAll).toBe(result);
//       });
//     });
//   });
// });
