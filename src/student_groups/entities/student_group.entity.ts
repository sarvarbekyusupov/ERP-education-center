import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class StudentGroup {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  studentId: number;

  @Field(() => Int)
  @Column()
  groupId: number;
}
