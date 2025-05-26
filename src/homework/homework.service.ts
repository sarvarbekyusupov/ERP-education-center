import { Injectable } from '@nestjs/common';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Homework } from "./entities/homework.entity";


@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepo: Repository<Homework>
  ) {}

  async create(createHomeworkDto: CreateHomeworkDto) {
    const newHomework = this.homeworkRepo.create(createHomeworkDto);
    return this.homeworkRepo.save(newHomework);
  }

  async findAll() {
    return this.homeworkRepo.find();
  }

  async findOne(id: number) {
    return this.homeworkRepo.findOneBy({ id });
  }

  async update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    await this.homeworkRepo.update(id, updateHomeworkDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const homework = await this.findOne(id);
    if (!homework) return null;
    return this.homeworkRepo.remove(homework);
  }
}

