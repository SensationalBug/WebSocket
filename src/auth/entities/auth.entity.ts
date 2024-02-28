import { MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID: string;

  @Column({ unique: true })
  @MinLength(6)
  username: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column()
  clientId: string;
}
