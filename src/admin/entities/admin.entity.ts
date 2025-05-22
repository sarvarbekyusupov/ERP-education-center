import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  hashed_password: string;

  @Column()
  phone: string;

  @Column({ default: "admin" })
  role: string;

  @Column({ default: false })
  isActive: boolean;
}