import { Module } from '@nestjs/common';
import { StudentGroupsService } from './student_groups.service';
import { StudentGroupsController } from './student_groups.controller';

@Module({
  controllers: [StudentGroupsController],
  providers: [StudentGroupsService],
})
export class StudentGroupsModule {}
