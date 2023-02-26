import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProfessorController } from '../professor.controller';
import { ProfessorService } from '../professor.service';
import { mockService } from './mocks';

describe('ProfessorController', () => {
  //In order to test in isolation the controller, we mock the service
  let controller: ProfessorController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProfessorController],
      providers: [ProfessorService],
    })
      .overrideProvider(ProfessorService) //override the current ProfessorService
      .useValue(mockService)
      .compile();

    controller = moduleRef.get<ProfessorController>(ProfessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('Get', () => {
    it('should get all professors', async () => {
      const professors = await controller.getAll();
      expect(professors.length).toBeGreaterThan(1);
    });
  });
  describe('Post', () => {
    it('should create successfully a new professor', () => {
      const dto = { name: 'John', password: 'Lennon' };
      const resultProfessor = {
        ...dto,
        active: true,
        expiration_date: expect.any(Date),
      };
      expect(controller.createProfessor(dto)).toEqual(resultProfessor);
    });
    it('should throw an error if the name and password are missing', async () => {
      const response = (await controller.createProfessor({
        name: '',
        password: '',
      })) as HttpException;
      expect(response.message).toBe('Name and password are required');
    });
    it('should throw an error if the name already exists', async () => {
      const response = (await controller.createProfessor({
        name: 'Test',
        password: 'abcd',
      })) as HttpException;
      expect(response.message).toBe('This username already exists');
    });
  });
  describe('Delete', () => {
    it('should delete successfully', async () => {
      const response = await controller.deleteProfessor(1);
      expect(response.message).toBe('Delete successfully');
    });
    it('should throw an error if the id is not found', async () => {
      const response = await controller.deleteProfessor(99991);
      expect(response.message).toBe('Professor not found');
    });
  });
  describe('Patch', () => {
    it('should update successfully', async () => {
      const result = await controller.updateProfessor(1, {
        active: true,
      });
      expect(result.message).toBe('Update successfully');
    });
    it('should throw an error if the id is not found', async () => {
      const result = await controller.updateProfessor(99991, {
        active: true,
      });
      expect(result.message).toBe('Professor not found');
    });
    it('should throw an error if the body is empty', async () => {
      const result = await controller.updateProfessor(99991, undefined);
      expect(result.message).toBe(
        'Attributes and values to modify are required',
      );
    });
  });
});
