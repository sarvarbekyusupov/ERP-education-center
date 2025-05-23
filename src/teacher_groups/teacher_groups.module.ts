import { Module } from "@nestjs/common";
import { TeacherGroupsService } from "./teacher_groups.service";
import { TeacherGroupsController } from "./teacher_groups.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherGroup } from "./entities/teacher_group.entity";
import { TeacherGroupsResolver } from "./teacher_groups.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([TeacherGroup])],
  controllers: [TeacherGroupsController],
  providers: [TeacherGroupsService, TeacherGroupsResolver],
})
export class TeacherGroupsModule {}
