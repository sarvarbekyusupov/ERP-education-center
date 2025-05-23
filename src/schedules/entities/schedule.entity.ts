import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Schedule {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  groupId: number;

  @Field()
  @Column({ type: "timestamp" })
  startTime: Date;

  @Field()
  @Column({ type: "timestamp" })
  endTime: Date;

  @Field()
  @Column()
  topic: string;
}
