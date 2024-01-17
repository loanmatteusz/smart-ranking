import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';
import { ParamValidation } from './pipes/param-validation.pipe';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {

  constructor(
    private readonly playersService: PlayersService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto
  ): Promise<Player> {
    return await this.playersService.createPlayer(createPlayerDto);
  }


  @Put("/:_id")
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param("_id", ParamValidation) _id: string,
  ): Promise<void> {
    await this.playersService.updatePlayer(_id, updatePlayerDto);
  }


  @Get()
  async listPlayers(): Promise<Array<Player>> {
    return await this.playersService.findPlayers();
  }


  @Get("/:_id")
  async getPlayer(
    @Param("_id") _id: string,
  ): Promise<Player> {
    return this.playersService.findPlayerById(_id);
  }

  
  @Delete("/:_id")
  async deletePlayer(
    @Param("_id", ParamValidation) id: string,
  ): Promise<void> {
    await this.playersService.delete(id);
  }

}
