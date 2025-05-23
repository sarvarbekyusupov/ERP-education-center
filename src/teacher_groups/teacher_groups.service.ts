import { Injectable } from '@nestjs/common';
import { CreateTeacherGroupDto } from './dto/create-teacher_group.dto';
import { UpdateTeacherGroupDto } from './dto/update-teacher_group.dto';

@Injectable()
export class TeacherGroupsService {
  create(createTeacherGroupDto: CreateTeacherGroupDto) {
    return 'This action adds a new teacherGroup';
  }

  findAll() {
    return `This action returns all teacherGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacherGroup`;
  }

  update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    return `This action updates a #${id} teacherGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacherGroup`;
  }
}
