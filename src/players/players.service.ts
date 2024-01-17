import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Player } from './interfaces/player.interface';

import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';


@Injectable()
export class PlayersService {

  private readonly logger = new Logger(PlayersService.name);


  constructor(
    @InjectModel("Player") private readonly playerModel: Model<Player>,
  ) {}


  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    const playerAlreadyExist = await this.playerModel.findOne({ email }).exec();
    if (playerAlreadyExist) {
      throw new BadRequestException(`Player with email ${email} already exist!`);
    }
    const playerCreated = new this.playerModel(createPlayerDto);
    return await playerCreated.save();
  }
  

  async updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const playerAlreadyExist = await this.playerModel.findOne({ _id: id }).exec();
    if (!playerAlreadyExist) {
      throw new NotFoundException(`Player with id ${id} not found!`);
    }
    await this.playerModel.findOneAndUpdate({ _id: id }, { $set: updatePlayerDto }).exec();
  }


  async findPlayers(): Promise<Array<Player>> {
    return await this.playerModel.find().exec();
  }


  async findPlayerById(id: string): Promise<Player> {
    const playerAlreadyExist = await this.playerModel.findOne({ _id: id }).exec();
    if (!playerAlreadyExist) {
      throw new NotFoundException(`Player with id: ${id} not found!`);
    }
    return playerAlreadyExist;
  }


  async delete(id: string): Promise<void> {
    const playerAlreadyExist = await this.playerModel.findOne({ _id: id }).exec();
    if (!playerAlreadyExist) {
      throw new NotFoundException(`Player with id: ${id} not found!`);
    }
    await this.playerModel.deleteOne({ _id: id }).exec();
  }

}
