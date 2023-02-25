import { CreateProfessorDTO, UpdateProfessorDTO } from '../DTO/professor.dto';
import { Professor } from '../professor.entity';

const mockUser = {
  name: 'Test',
  password: 'Testie',
  active: false,
  expiration_date: new Date(),
};

export const mockService = {
  create: jest.fn((dto: CreateProfessorDTO) => {
    const notEmpty = { message: 'Name and password are required' };
    const notDuplicate = { message: 'This username already exists' };

    if (!dto.name) return notEmpty;
    if (dto.name === 'Test') return notDuplicate;

    return {
      ...dto,
      active: true,
      expiration_date: new Date(),
    };
  }),
  getAll: jest.fn(() => {
    const professor1 = new Professor();
    const professor2 = new Professor();
    return [professor1, professor2];
  }),
  delete: jest.fn((id: number) => {
    const success = { message: 'Delete successfully' };
    const notFound = { message: 'User not found' };

    if (id === 1) return success;
    return notFound;
  }),
  update: jest.fn((id: number, dto: UpdateProfessorDTO) => {
    const success = { message: 'Update successfully' };
    const notFound = { message: 'User not found' };
    const notBody = { message: 'Attributes and values to modify are required' };

    if (id === 1 && dto) return success;
    if (!dto) return notBody;
    return notFound;
  }),
};
