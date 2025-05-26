import { Inject, Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const newGrade = this.gradeRepo.create(createGradeDto);
    return this.gradeRepo.save(newGrade); 
  }

  async findAll() {
    return this.gradeRepo.find();
  }

  async findOne(id: number) {
    return this.gradeRepo.findOneBy({ id });
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    await this.gradeRepo.update(id, updateGradeDto);
    return this.findOne(id); 
  }

  async remove(id: number) {
    const grade = await this.findOne(id);
    if (!grade) return null;
    return this.gradeRepo.remove(grade); 
  }
}
