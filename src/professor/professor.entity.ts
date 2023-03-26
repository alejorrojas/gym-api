import { Student } from 'src/student/student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column()
  role: string;

  @Column()
  expiration_date: Date;

  @OneToMany(() => Student, (student) => student.professor)
  students: Student[];
}
