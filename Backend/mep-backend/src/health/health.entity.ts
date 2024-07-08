import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Health {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  steps: number;

  @Column()
  calories: number;

  @Column()
  water_intake: number;

  @ManyToOne(() => User, user => user.health)
  user: User;

  @CreateDateColumn()
  date: Date;
}
