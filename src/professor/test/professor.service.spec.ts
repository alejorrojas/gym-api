import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Professor } from '../professor.entity';
import { ProfessorService } from '../professor.service';
import { mockRepository } from './mocks';

describe('ProfessorService', () => {
  //In order to test in isolation the service, we mock the repository
  let service: ProfessorService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProfessorService,
        { provide: getRepositoryToken(Professor), useValue: mockRepository },
      ],
    }).compile();

    service = moduleRef.get<ProfessorService>(ProfessorService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Get', () => {
    it('should return a list of professors', async () => {
      const result = await service.getAll();
      expect(result.length).toBeGreaterThan(1);
    });
  });
  describe('Create', () => {
    it('should create successfully', async () => {
      const dto = { name: 'Tom', password: 'Lennon' };

      const result = await service.create(dto);
      expect(result.name).toBe('Tom');
      expect(mockRepository.create).toHaveBeenCalled();
    });
  });
  describe('Update', () => {
    xit('should update successfully', async () => {
      const dto = { active: true };
      const result = service.update(1, dto);
      // expect(result).toEqual({ id: 1, ...dto });
      expect(mockRepository.update).toHaveBeenCalled();
    });
  });
});
