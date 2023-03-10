import { CreateProfessorDTO } from '../dto/create-professor.dto';
import { UpdateProfessorDTO } from '../dto/update-professor.dto';
import { Professor } from '../professor.entity';

const notDuplicate = { message: 'This username already exists' };
const notFound = { message: 'Professor not found' };
const notEmpty = { message: 'Name and password are required' };
const notBody = { message: 'Attributes and values to modify are required' };

export const mockService = {
  create: jest.fn((dto: CreateProfessorDTO) => {
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

    if (id === 1) return success;
    return notFound;
  }),
  update: jest.fn((id: number, dto: UpdateProfessorDTO) => {
    const success = { message: 'Update successfully' };

    if (id === 1 && dto) return success;
    if (!dto) return notBody;
    return notFound;
  }),
};

interface FindOneOpts {
  where: {
    id?: number;
    name?: string;
  };
}

export const mockRepository = {
  find: jest.fn(() => {
    const professor1 = new Professor();
    const professor2 = new Professor();
    return [professor1, professor2];
  }),
  findOne: jest.fn(({ where: { id = 1, name } }: FindOneOpts) => {
    if (name === 'Test') return notDuplicate;
    if (id !== 1) return notFound;
    return undefined;
  }),
  create: jest.fn((dto) => dto),
  save: jest.fn((professor) => Promise.resolve(professor)),
  update: jest.fn(() => {
    const success = { message: 'Update successfully' };
    return success;
  }),
};
