import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Response, Request } from "express";

import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./entities/admin.entity";
import { JwtTokenService } from "../auth/jwt.service";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private readonly myjwtService: JwtTokenService // Inject your custom JWT service
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.adminRepo.findOneBy({
      email: createAdminDto.email,
    });

    if (existingAdmin) {
      throw new BadRequestException("An admin with this email already exists");
    }

    const { password, confirm_password, ...rest } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newAdmin = this.adminRepo.create({
      ...rest,
      hashed_password: hashedPassword,
    });

    await this.adminRepo.save(newAdmin);

    return { message: "New admin has been added successfully" };
  }

  async findAll() {
    return await this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException("Admin not found");
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const result = await this.adminRepo.update({ id }, updateAdminDto);
    if (result.affected === 0) {
      throw new NotFoundException("Admin not found");
    }
    return { message: "Admin updated successfully" };
  }

  async remove(id: number) {
    const result = await this.adminRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException("Admin not found");
    }
    return { message: "Admin deleted successfully" };
  }

  async findByEmail(email: string) {
    const admin = await this.adminRepo.findOneBy({ email });

    if (!admin) {
      throw new NotFoundException(`Admin with email: ${email} not found`);
    }

    return admin;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const admin = await this.adminRepo.findOneBy({
      activation_link: link,
      is_active: false,
    });

    if (!admin) {
      throw new BadRequestException("User already activated or invalid link");
    }

    admin.is_active = true;
    await this.adminRepo.save(admin);

    return {
      message: "User activated successfully",
      is_active: admin.is_active,
    };
  }

  async refreshTokens(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not found");
    }

    const payload = await this.myjwtService.verifyRefreshToken(refresh_token);
    const admin = await this.adminRepo.findOneBy({ id: payload.id });

    if (!admin || !admin.refresh_token) {
      throw new UnauthorizedException("Admin not found or not logged in");
    }

    const isValid = await bcrypt.compare(refresh_token, admin.refresh_token);
    if (!isValid) {
      throw new UnauthorizedException("Invalid Refresh Token");
    }

    const { accessToken, refreshToken } =
      await this.myjwtService.generateTokens({
        id: admin.id,
        email: admin.email,
        role: "admin",
        is_active: admin.is_active,
      });

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.refresh_token = hashed_refresh_token;
    await this.adminRepo.save(admin);

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
