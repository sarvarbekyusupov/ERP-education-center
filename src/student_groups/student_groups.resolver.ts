import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { StudentGroupsService } from "./student_groups.service";
import { StudentGroup } from "./entities/student_group.entity";
import { CreateStudentGroupDto } from "./dto/create-student_group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student_group.dto";

@Resolver(() => StudentGroup)
export class StudentGroupsResolver {
  constructor(private readonly studentGroupsService: StudentGroupsService) {}

  @Mutation(() => StudentGroup)
  createStudentGroup(
    @Args("createStudentGroupDto") createStudentGroupDto: CreateStudentGroupDto
  ) {
    return this.studentGroupsService.create(createStudentGroupDto);
  }

  @Query(() => [StudentGroup], { name: "studentGroups" })
  findAll() {
    return this.studentGroupsService.findAll();
  }

  @Query(() => StudentGroup, { name: "studentGroup" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.studentGroupsService.findOne(id);
  }

  @Mutation(() => StudentGroup)
  updateStudentGroup(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateStudentGroupDto") updateStudentGroupDto: UpdateStudentGroupDto
  ) {
    return this.studentGroupsService.update(id, updateStudentGroupDto);
  }

  @Mutation(() => Boolean)
  removeStudentGroup(@Args("id", { type: () => Int }) id: number) {
    return this.studentGroupsService.remove(id).then(() => true);
  }
}
