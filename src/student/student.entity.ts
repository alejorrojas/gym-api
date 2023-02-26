import { Professor } from 'src/professor/professor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column()
  expiration_date: Date;

  @Column()
  professorId: number;

  @ManyToOne(() => Professor, (professor) => professor.students)
  professor: Professor;
}
