import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HomeworkSubmission } from "./entities/homework-submission.entity";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { UpdateHomeworkSubmissionDto } from "./dto/update-homework-submission.dto";

@Injectable()
export class HomeworkSubmissionsService {
  constructor(
    @InjectRepository(HomeworkSubmission)
    private readonly submissionRepo: Repository<HomeworkSubmission>
  ) {}

  async create(createDto: CreateHomeworkSubmissionDto) {
    const submission = this.submissionRepo.create(createDto);
    return this.submissionRepo.save(submission);
  }

  async findAll() {
    return this.submissionRepo.find();
  }

  async findOne(id: number) {
    return this.submissionRepo.findOneBy({ id });
  }

  async update(id: number, updateDto: UpdateHomeworkSubmissionDto) {
    await this.submissionRepo.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const submission = await this.findOne(id);
    if (!submission) return null;
    return this.submissionRepo.remove(submission);
  }
}
