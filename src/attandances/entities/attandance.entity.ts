import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Attandance {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  studentId: number;

  @Field(() => Int)
  @Column()
  scheduleId: number;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column({ type: "date" })
  date: string;
}
