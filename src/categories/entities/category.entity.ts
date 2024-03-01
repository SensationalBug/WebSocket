import { Column, Entity } from 'typeorm';

@Entity()
export class Category {
  @Column({ primary: true, unique: true })
  id: string;

  @Column()
  createdBy: string;

  @Column({ nullable: false })
  categoryName: string;

  @Column({ default: 'none' })
  categoryIcon: string;

  @Column({ default: false })
  isDefault: boolean;
}
