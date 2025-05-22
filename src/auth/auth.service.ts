import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { Repository } from 'typeorm';
import { Teacher } from '../teacher/entities/teacher.entity';
import { UserSignInDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>
  ) {}

  async signIn(userSignInDto: UserSignInDto) {
    const{ email, password, role} = userSignInDto

    
  }
}
