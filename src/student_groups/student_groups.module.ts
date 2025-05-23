import { Module } from "@nestjs/common";
import { StudentGroupsService } from "./student_groups.service";
import { StudentGroupsController } from "./student_groups.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentGroup } from "./entities/student_group.entity";
import { StudentGroupsResolver } from "./student_groups.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([StudentGroup])],
  controllers: [StudentGroupsController],
  providers: [StudentGroupsService, StudentGroupsResolver],
})
export class StudentGroupsModule {}
