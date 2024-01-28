import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(
    private readonly challengesService: ChallengesService
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto
  ) {
    return await this.challengesService.create(createChallengeDto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  async getChallenge(
    @Query("playerId") playerId: string,
  ) {
    if (playerId) {
      return await this.challengesService.getByPlayer(playerId);
    }
    return await this.challengesService.list();
  }

  @Put("/:_id")
  @UsePipes(ValidationPipe)
  async updateChallenge(
    @Param("_id") _id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    return await this.challengesService.update(_id, updateChallengeDto);
  }

  @Delete("/:_id")
  @UsePipes(ValidationPipe)
  async cancelChallenge(
    @Param("_id") _id: string,
  ) {
    return await this.challengesService.cancel(_id);
  }
}
