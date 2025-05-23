import { Module } from '@nestjs/common';
import { TeacherGroupsService } from './teacher_groups.service';
import { TeacherGroupsController } from './teacher_groups.controller';

@Module({
  controllers: [TeacherGroupsController],
  providers: [TeacherGroupsService],
})
export class TeacherGroupsModule {}
