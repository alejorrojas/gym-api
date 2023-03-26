import { Professor } from 'src/professor/professor.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  active: boolean;

  @Column()
  expiration_date: Date;

  @Column({ default: false, nullable: true })
  attendance_today: boolean;

  @UpdateDateColumn()
  update_at: Date;

  @Column()
  role: string;

  @Column()
  professorId: number;

  @ManyToOne(() => Professor, (professor) => professor.students)
  professor: Professor;
}
