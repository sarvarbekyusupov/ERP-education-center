import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./entities/group.entity";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepo: Repository<Group>
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepo.create(createGroupDto);
    return await this.groupRepo.save(group);
  }

  async findAll() {
    return await this.groupRepo.find();
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOneBy({ id });
    if (!group) throw new NotFoundException("Group not found");
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const result = await this.groupRepo.update({ id }, updateGroupDto);
    if (result.affected === 0) throw new NotFoundException("Group not found");
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.groupRepo.delete({ id });
    if (result.affected === 0) throw new NotFoundException("Group not found");
    return { message: "Group deleted successfully" };
  }
}
