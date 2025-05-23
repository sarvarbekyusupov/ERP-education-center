import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentGroup } from "./entities/student_group.entity";
import { CreateStudentGroupDto } from "./dto/create-student_group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student_group.dto";

@Injectable()
export class StudentGroupsService {
  constructor(
    @InjectRepository(StudentGroup)
    private studentGroupRepo: Repository<StudentGroup>
  ) {}

  async create(createStudentGroupDto: CreateStudentGroupDto) {
    const studentGroup = this.studentGroupRepo.create(createStudentGroupDto);
    return await this.studentGroupRepo.save(studentGroup);
  }

  async findAll() {
    return await this.studentGroupRepo.find();
  }

  async findOne(id: number) {
    const studentGroup = await this.studentGroupRepo.findOneBy({ id });
    if (!studentGroup) throw new NotFoundException("StudentGroup not found");
    return studentGroup;
  }

  async update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    const result = await this.studentGroupRepo.update(
      { id },
      updateStudentGroupDto
    );
    if (result.affected === 0)
      throw new NotFoundException("StudentGroup not found");
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.studentGroupRepo.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException("StudentGroup not found");
    return { message: "StudentGroup deleted successfully" };
  }
}
