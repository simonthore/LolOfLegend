import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Team } from "../entity/Team";
import { getRepository } from "typeorm";

@Resolver()
export class TeamResolver {
  private teamRepository = getRepository(Team);

  @Query(() => [Team])
  async teams(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  @Mutation(() => Team)
  async createTeam(
    @Arg("name") name: string,
    // @Arg("description", { nullable: true }) description?: string
  ): Promise<Team> {
    const newTeam = this.teamRepository.create({ name });
    return await this.teamRepository.save(newTeam);
  }

  @Mutation(() => Team)
  async updateTeam(
    @Arg("id") id: number,
    @Arg("name") name: string,
    // @Arg("description", { nullable: true }) description?: string
  ): Promise<Team | null> {
    let teamToUpdate = await this.teamRepository.findOne({ where: { id } });

    if (!teamToUpdate) {
      return null;
    }

    teamToUpdate.name = name;
    // teamToUpdate.description = description;

    return await this.teamRepository.save(teamToUpdate);
  }

  @Mutation(() => Boolean)
  async deleteTeam(@Arg("id") id: number): Promise<boolean> {
    const result = await this.teamRepository.delete(id);
    return result.affected !== 0;
  }
}
