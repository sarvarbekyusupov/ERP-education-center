import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Students } from "./entities/student.entity";
import { Request, Response } from "express";
import { JwtTokenService } from "../auth/jwt.service";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentsRepo: Repository<Students>,
    private readonly myjwtService: JwtTokenService
  ) {}

  async create(createStudentsDto: CreateStudentDto) {
    const existingStudent = await this.studentsRepo.findOneBy({
      email: createStudentsDto.email,
    });

    if (existingStudent) {
      throw new BadRequestException("A student with this email already exists");
    }

    const { password, confirm_password, ...rest } = createStudentsDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newStudent = this.studentsRepo.create({
      ...rest,
      hashed_password: hashedPassword,
    });

    await this.studentsRepo.save(newStudent);

    return { message: "New student has been added successfully" };
  }

  async findAll() {
    return await this.studentsRepo.find();
  }

  async findOne(id: number) {
    const student = await this.studentsRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student not found");
    }
    return student;
  }

  async update(id: number, updateStudentsDto: UpdateStudentDto) {
    const result = await this.studentsRepo.update({ id }, updateStudentsDto);
    if (result.affected === 0) {
      throw new NotFoundException("Student not found");
    }
    return { message: "Student updated successfully" };
  }

  async remove(id: number) {
    const result = await this.studentsRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException("Student not found");
    }
    return { message: "Student deleted successfully" };
  }

  async findByEmail(email: string) {
    const student = await this.studentsRepo.findOneBy({ email });

    if (!student) {
      throw new NotFoundException(`Student with email: ${email} not found`);
    }

    return student;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const student = await this.studentsRepo.findOneBy({
      activation_link: link,
      is_active: false,
    });

    if (!student) {
      throw new BadRequestException("User already activated or invalid link");
    }

    student.is_active = true;
    await this.studentsRepo.save(student);

    return {
      message: "User activated successfully",
      is_active: student.is_active,
    };
  }

  async refreshTokens(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not found");
    }

    const payload = await this.myjwtService.verifyRefreshToken(refresh_token);
    const student = await this.studentsRepo.findOneBy({ id: payload.id });

    if (!student || !student.refresh_token) {
      throw new UnauthorizedException("Student not found or not logged in");
    }

    const isValid = await bcrypt.compare(refresh_token, student.refresh_token);
    if (!isValid) {
      throw new UnauthorizedException("Invalid Refresh Token");
    }

    const { accessToken, refreshToken } =
      await this.myjwtService.generateTokens({
        id: student.id,
        email: student.email,
        role: "student",
        is_active: student.is_active,
      });

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    student.refresh_token = hashed_refresh_token;
    await this.studentsRepo.save(student);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      token: accessToken,
    });
  }
}
