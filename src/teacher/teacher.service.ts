import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Teacher } from "./entities/teacher.entity";
import * as bcrypt from "bcrypt";
import { JwtTokenService } from "../auth/jwt.service";
import { Response, Request } from "express";


@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    private readonly myjwtService: JwtTokenService 
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

  async findByEmail(email: string) {
    const teacher = await this.teacherRepo.findOneBy({ email });

    if (!teacher) {
      throw new NotFoundException(`Teacher with email: ${email} not found`);
    }

    return teacher;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const teacher = await this.teacherRepo.findOneBy({
      activation_link: link,
      is_active: false,
    });

    if (!teacher) {
      throw new BadRequestException("User already activated or invalid link");
    }

    teacher.is_active = true;
    await this.teacherRepo.save(teacher);

    return {
      message: "User activated successfully",
      is_active: teacher.is_active,
    };
  }

  async refreshTokens(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not found");
    }

    const payload = await this.myjwtService.verifyRefreshToken(refresh_token);
    const teacher = await this.teacherRepo.findOneBy({ id: payload.id });

    if (!teacher || !teacher.refresh_token) {
      throw new UnauthorizedException("Teacher not found or not logged in");
    }

    const isValid = await bcrypt.compare(refresh_token, teacher.refresh_token);
    if (!isValid) {
      throw new UnauthorizedException("Invalid Refresh Token");
    }

    const { accessToken, refreshToken } =
      await this.myjwtService.generateTokens({
        id: teacher.id,
        email: teacher.email,
        role: "teacher",
        is_active: teacher.is_active,
      });

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    teacher.refresh_token = hashed_refresh_token;
    await this.teacherRepo.save(teacher);

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
