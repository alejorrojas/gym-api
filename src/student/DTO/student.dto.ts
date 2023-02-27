export class CreateStudentDTO {
  name: string;
  password?: string;
  professorId: number;
}

export class UpdateStudentDTO {
  id: number;
  name?: string;
  password?: string;
  active?: boolean;
  expiration_date?: Date;
}
