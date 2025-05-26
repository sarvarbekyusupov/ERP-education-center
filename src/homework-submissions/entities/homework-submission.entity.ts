import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class HomeworkSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentName: string;

  @Column()
  contentUrl: string; // e.g., link to uploaded file

  @Column({ default: false })
  graded: boolean;

  @CreateDateColumn()
  submittedAt: Date;
}
