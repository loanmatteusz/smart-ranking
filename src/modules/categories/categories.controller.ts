import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {

  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCategoryDto: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }


  @Get()
  async list(): Promise<Array<Category>> {
    return await this.categoriesService.list();
  }


  @Get("/:category")
  async getCategory(
    @Param("category") category: string,
  ): Promise<Category> {
    return await this.categoriesService.get(category);
  }


  @Put("/:category")
  @UsePipes(ValidationPipe)
  async update(
    @Param("category") category: string,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ): Promise<void> {
    await this.categoriesService.update(category, updateCategoryDto);
  }


  @Post("/:category/players/:playerId")
  async addCategoryPlayer(
    @Param() params: Array<string>,
  ): Promise<void> {
    await this.categoriesService.addCategoryPlayer(params);
  }
}
