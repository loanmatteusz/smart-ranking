import { Model } from 'mongoose';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenge } from './interfaces/challenge.interface';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { PlayersService } from '../players/players.service';
import { CategoriesService } from '../categories/categories.service';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { ChallengeResponseStatus } from './interfaces/challenge-res-status.enum';


@Injectable()
export class ChallengesService {

  private readonly logger = new Logger(ChallengesService.name);

  constructor(
    @InjectModel("Challenge") private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) { }


  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const { challenger, players: [first, second] } = createChallengeDto;

    const [firstPlayer, secondPlayer] = await Promise.all([
      this.playersService.findPlayerById(challenger._id),
      this.playersService.findPlayerById(first._id),
      this.playersService.findPlayerById(second._id),
    ]);

    if (!firstPlayer || !secondPlayer) {
      throw new BadRequestException("Some player don't exist!");
    }

    const somePlayerIsChallenger = createChallengeDto.players.find(player => player._id === challenger._id);
    if (!somePlayerIsChallenger) {
      throw new BadRequestException("Challenger should be a player of this match!");
    }

    const categories = await this.categoriesService.list();
    const challengerCategory = categories
      .find(category => category.players.find(player => player._id == challenger._id)).category;

    if (!challengerCategory) {
      throw new BadRequestException("Challenger should include a category!");
    }

    const createChallenge = new this.challengeModel(createChallengeDto);
    this.logger.log(
      `A categoria do Desafiante é a Categoria ${challengerCategory}, ` +
      `o desafio foi solicitado para ${createChallenge.challengeMoment.toUTCString()} e está ${ChallengeStatus.PENDING}.`
    );

    return await createChallenge.save();
  }


  async list(): Promise<Challenge[]> {
    return await this.challengeModel.find();
  }


  async getByPlayer(player: string): Promise<Challenge> {
    return await this.challengeModel.findOne({ players: { $in: player } });
  }

  async update(_id: string, updateChallengeDto: UpdateChallengeDto) {
    const challengeExist = await this.challengeModel.findById(_id);
    if (!challengeExist) {
      throw new BadRequestException(`Challenge ${_id} not exist!`);
    }
    return await this.challengeModel.findOneAndUpdate({ _id }, { $set: updateChallengeDto });
  }

  async cancel(_id: string) {
    return await this.challengeModel.findOneAndUpdate({ _id },  {
      $set: {
        status: ChallengeResponseStatus.CANCELED,
      },
    });
  }
}
