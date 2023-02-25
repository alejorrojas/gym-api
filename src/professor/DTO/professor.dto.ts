export class CreateProfessorDTO {
  name: string;
  password: string;
}

export class UpdateProfessorDTO {
  name?: string;
  password?: string;
  active?: boolean;
  expiration_date?: Date;
}
