import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { Admin } from './admin/entities/admin.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST, 
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Admin, Teacher],
      synchronize: true, // set to false in production
    }),
    AdminModule,
    TeacherModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
