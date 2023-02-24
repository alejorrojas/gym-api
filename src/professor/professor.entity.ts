import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  expiration_date: Date;
}
