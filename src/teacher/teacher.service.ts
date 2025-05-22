import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Teacher } from "./entities/teacher.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const existingTeacher = await this.teacherRepo.findOneBy({
      email: createTeacherDto.email,
    });

    if (existingTeacher) {
      throw new BadRequestException("A teacher with this email already exists");
    }

    const { password, confirm_password, ...rest } = createTeacherDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newTeacher = this.teacherRepo.create({
      ...rest,
      hashed_password: hashedPassword,
    });

    await this.teacherRepo.save(newTeacher);

    return { message: "New teacher has been added successfully" };
  }

  async findAll() {
    return await this.teacherRepo.find();
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepo.findOneBy({ id });
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const result = await this.teacherRepo.update({ id }, updateTeacherDto);
    if (result.affected === 0) {
      throw new NotFoundException("Teacher not found");
    }
    return { message: "Teacher updated successfully" };
  }

  async remove(id: number) {
    const result = await this.teacherRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException("Teacher not found");
    }
    return { message: "Teacher deleted successfully" };
  }
}
