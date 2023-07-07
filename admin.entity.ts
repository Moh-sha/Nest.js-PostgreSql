import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity('adminEntity')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
}

@Entity()
export class AdminCrud {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
}
