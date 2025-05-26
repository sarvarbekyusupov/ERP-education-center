import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  student_id: number;

  @Column("int")
  homework_submission_id: number;

  @Column("int")
  teacher_id: number;

  @Column("int")
  grade: number;

  @Column({type:'date'})
  date: string;

  @Column()
  comment: string;
}

