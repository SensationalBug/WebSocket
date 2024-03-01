import { Column, Entity } from 'typeorm';
import { UserRole } from '../dto/register-auth.dto';

@Entity()
export class User {
  @Column({ primary: true, unique: true })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: UserRole;
}
