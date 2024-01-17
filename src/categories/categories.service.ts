import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';


@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel("Category") private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async create(createCategoryDto: CreateCategoryDTO): Promise<Category> {
    const { category } = createCategoryDto;
    const categoryAlreadyExist = await this.categoryModel.findOne({ category });
    if (categoryAlreadyExist) {
      throw new BadRequestException(`Category ${category} already exist!`);
    }
    const categoryCreated = new this.categoryModel(createCategoryDto);
    return await categoryCreated.save();
  }


  async list(): Promise<Array<Category>> {
    return await this.categoryModel.find().populate("players");
  }


  async get(category: string): Promise<Category> {
    const categoryFinded = await this.categoryModel.findOne({ category }).populate("players");
    if (!categoryFinded) {
      throw new BadRequestException(`Category ${category} not found!`);
    }
    return categoryFinded;
  }


  async update(category: string, updateCategoryDto: UpdateCategoryDTO): Promise<void> {
    const categoryFinded = await this.categoryModel.findOne({ category });
    if (!categoryFinded) {
      throw new BadRequestException(`Category ${category} not found!`);
    }
    await this.categoryModel.updateOne({ category }, { $set: updateCategoryDto });
  }


  async addCategoryPlayer(params: Array<string>): Promise<void> {
    const category = params["category"];
    const playerId = params["playerId"];

    const [ categoryFinded, playerExist, playerAlreadyRegistred ] = await Promise.all([
      await this.categoryModel.findOne({ category }),
      await this.playersService.findPlayerById(playerId),
      await this.categoryModel.find({ category }).where("players").in(playerId),
    ]);
    
    if (!categoryFinded) {
      throw new BadRequestException(`Category ${category} not found!`);
    }

    if (!playerExist) {
      throw new BadRequestException(`Player ${playerId} not found!`);
    }

    if (playerAlreadyRegistred.length > 0) {
      throw new BadRequestException(`Player ${playerId} already registred in category ${category}!`);
    }

    categoryFinded.players.push(playerId);
    await this.categoryModel.findOneAndUpdate({ category }, { $set: categoryFinded });
  }
}
