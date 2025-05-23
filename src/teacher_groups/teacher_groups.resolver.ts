import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TeacherGroupsService } from "./teacher_groups.service";
import { TeacherGroup } from "./entities/teacher_group.entity";
import { CreateTeacherGroupDto } from "./dto/create-teacher_group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher_group.dto";

@Resolver(() => TeacherGroup)
export class TeacherGroupsResolver {
  constructor(private readonly teacherGroupsService: TeacherGroupsService) {}

  @Mutation(() => TeacherGroup)
  createTeacherGroup(
    @Args("createTeacherGroupDto") createTeacherGroupDto: CreateTeacherGroupDto
  ) {
    return this.teacherGroupsService.create(createTeacherGroupDto);
  }

  @Query(() => [TeacherGroup], { name: "teacherGroups" })
  findAll() {
    return this.teacherGroupsService.findAll();
  }

  @Query(() => TeacherGroup, { name: "teacherGroup" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.teacherGroupsService.findOne(id);
  }

  @Mutation(() => TeacherGroup)
  updateTeacherGroup(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateTeacherGroupDto") updateTeacherGroupDto: UpdateTeacherGroupDto
  ) {
    return this.teacherGroupsService.update(id, updateTeacherGroupDto);
  }

  @Mutation(() => Boolean)
  removeTeacherGroup(@Args("id", { type: () => Int }) id: number) {
    return this.teacherGroupsService.remove(id).then(() => true);
  }
}
