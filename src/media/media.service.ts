import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Media } from "./entities/media.entity";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    const media = this.mediaRepo.create(createMediaDto);
    return this.mediaRepo.save(media);
  }

  async findAll() {
    return this.mediaRepo.find();
  }

  async findOne(id: number) {
    return this.mediaRepo.findOneBy({ id });
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    await this.mediaRepo.update(id, updateMediaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const media = await this.findOne(id);
    if (!media) return null;
    return this.mediaRepo.remove(media);
  }
}
