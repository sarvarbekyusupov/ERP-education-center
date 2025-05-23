import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AttandancesService } from "./attandances.service";
import { Attandance } from "./entities/attandance.entity";
import { CreateAttandanceDto } from "./dto/create-attandance.dto";
import { UpdateAttandanceDto } from "./dto/update-attandance.dto";

@Resolver(() => Attandance)
export class AttandancesResolver {
  constructor(private readonly attandancesService: AttandancesService) {}

  @Mutation(() => Attandance)
  createAttandance(
    @Args("createAttandanceDto") createAttandanceDto: CreateAttandanceDto
  ) {
    return this.attandancesService.create(createAttandanceDto);
  }

  @Query(() => [Attandance], { name: "attandances" })
  findAll() {
    return this.attandancesService.findAll();
  }

  @Query(() => Attandance, { name: "attandance" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.attandancesService.findOne(id);
  }

  @Mutation(() => Attandance)
  updateAttandance(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateAttandanceDto") updateAttandanceDto: UpdateAttandanceDto
  ) {
    return this.attandancesService.update(id, updateAttandanceDto);
  }

  @Mutation(() => Boolean)
  removeAttandance(@Args("id", { type: () => Int }) id: number) {
    return this.attandancesService.remove(id).then(() => true);
  }
}
