import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TeacherGroup } from "./entities/teacher_group.entity";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";

@Injectable()
export class TeacherGroupsService {
  constructor(
    @InjectRepository(TeacherGroup)
    private teacherGroupRepo: Repository<TeacherGroup>
  ) {}

  async create(createTeacherGroupDto: CreateTeacherGroupDto) {
    const teacherGroup = this.teacherGroupRepo.create(createTeacherGroupDto);
    return await this.teacherGroupRepo.save(teacherGroup);
  }

  async findAll() {
    return await this.teacherGroupRepo.find();
  }

  async findOne(id: number) {
    const teacherGroup = await this.teacherGroupRepo.findOneBy({ id });
    if (!teacherGroup) throw new NotFoundException("TeacherGroup not found");
    return teacherGroup;
  }

  async update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    const result = await this.teacherGroupRepo.update(
      { id },
      updateTeacherGroupDto
    );
    if (result.affected === 0)
      throw new NotFoundException("TeacherGroup not found");
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.teacherGroupRepo.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException("TeacherGroup not found");
    return { message: "TeacherGroup deleted successfully" };
  }
}
