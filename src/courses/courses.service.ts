import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "./entities/course.entity";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepo.create(createCourseDto);
    return await this.courseRepo.save(course);
  }

  async findAll() {
    return await this.courseRepo.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException("Course not found");
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const result = await this.courseRepo.update({ id }, updateCourseDto);
    if (result.affected === 0) throw new NotFoundException("Course not found");
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.courseRepo.delete({ id });
    if (result.affected === 0) throw new NotFoundException("Course not found");
    return { message: "Course deleted successfully" };
  }
}
