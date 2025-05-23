import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SchedulesService } from "./schedules.service";
import { Schedule } from "./entities/schedule.entity";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Mutation(() => Schedule)
  createSchedule(
    @Args("createScheduleDto") createScheduleDto: CreateScheduleDto
  ) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Query(() => [Schedule], { name: "schedules" })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Query(() => Schedule, { name: "schedule" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.schedulesService.findOne(id);
  }

  @Mutation(() => Schedule)
  updateSchedule(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateScheduleDto") updateScheduleDto: UpdateScheduleDto
  ) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Mutation(() => Boolean)
  removeSchedule(@Args("id", { type: () => Int }) id: number) {
    return this.schedulesService.remove(id).then(() => true);
  }
}
