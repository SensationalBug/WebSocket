import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdBy: string;

  @Column({ nullable: false })
  categoryName: string;

  @Column({ default: 'none' })
  categoryIcon: string;
}
