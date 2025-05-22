import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>
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
}
