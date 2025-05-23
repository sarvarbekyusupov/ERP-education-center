import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttandancesService } from './attandances.service';
import { CreateAttandanceDto } from './dto/create-attandance.dto';
import { UpdateAttandanceDto } from './dto/update-attandance.dto';

@Controller('attandances')
export class AttandancesController {
  constructor(private readonly attandancesService: AttandancesService) {}

  @Post()
  create(@Body() createAttandanceDto: CreateAttandanceDto) {
    return this.attandancesService.create(createAttandanceDto);
  }

  @Get()
  findAll() {
    return this.attandancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attandancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttandanceDto: UpdateAttandanceDto) {
    return this.attandancesService.update(+id, updateAttandanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attandancesService.remove(+id);
  }
}
