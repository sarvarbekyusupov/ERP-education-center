import { Module } from "@nestjs/common";
import { AttandancesService } from "./attandances.service";
import { AttandancesController } from "./attandances.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attandance } from "./entities/attandance.entity";
import { AttandancesResolver } from "./attandances.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Attandance])],
  controllers: [AttandancesController],
  providers: [AttandancesService, AttandancesResolver],
})
export class AttandancesModule {}
