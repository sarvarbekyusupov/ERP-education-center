import { Module } from '@nestjs/common';
import { HomeworkSubmissionsService } from './homework-submissions.service';
import { HomeworkSubmissionsController } from './homework-submissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkSubmission } from './entities/homework-submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeworkSubmission])],

  controllers: [HomeworkSubmissionsController],
  providers: [HomeworkSubmissionsService],
})
export class HomeworkSubmissionsModule {}
