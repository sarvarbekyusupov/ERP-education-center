import { Module } from '@nestjs/common';
import { AttandancesService } from './attandances.service';
import { AttandancesController } from './attandances.controller';

@Module({
  controllers: [AttandancesController],
  providers: [AttandancesService],
})
export class AttandancesModule {}
