import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Attandance } from "./entities/attandance.entity";
import { CreateAttandanceDto } from "./dto/create-attandance.dto";
import { UpdateAttandanceDto } from "./dto/update-attandance.dto";

@Injectable()
export class AttandancesService {
  constructor(
    @InjectRepository(Attandance)
    private attandanceRepo: Repository<Attandance>
  ) {}

  async create(createAttandanceDto: CreateAttandanceDto) {
    const attandance = this.attandanceRepo.create(createAttandanceDto);
    return await this.attandanceRepo.save(attandance);
  }

  async findAll() {
    return await this.attandanceRepo.find();
  }

  async findOne(id: number) {
    const attandance = await this.attandanceRepo.findOneBy({ id });
    if (!attandance) throw new NotFoundException("Attandance not found");
    return attandance;
  }

  async update(id: number, updateAttandanceDto: UpdateAttandanceDto) {
    const result = await this.attandanceRepo.update(
      { id },
      updateAttandanceDto
    );
    if (result.affected === 0)
      throw new NotFoundException("Attandance not found");
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.attandanceRepo.delete({ id });
    if (result.affected === 0)
      throw new NotFoundException("Attandance not found");
    return { message: "Attandance deleted successfully" };
  }
}
