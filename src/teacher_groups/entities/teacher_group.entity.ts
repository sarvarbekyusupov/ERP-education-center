import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class TeacherGroup {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  teacherId: number;

  @Field(() => Int)
  @Column()
  groupId: number;
}
