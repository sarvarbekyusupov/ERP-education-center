

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Students {
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

  @Column({ default: "teacher" })
  role: string;

  @Column({ default: false })
  is_active: boolean;

  @Column()
  gender: string;

  @Column()
  activation_link: string;

  @Column()
  refresh_token: string;

  @Column()
  date_of_birth: string;

  @Column()
  avatar_url: string;
}
