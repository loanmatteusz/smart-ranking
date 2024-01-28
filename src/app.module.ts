import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './modules/players/players.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ChallengesModule } from './modules/challenges/challenges.module';

const URI = "mongodb+srv://dev29cz:dev123@smart-ranking.0yhjfjx.mongodb.net/smart-ranking-db?retryWrites=true&w=majority";

@Module({
  imports: [
    MongooseModule.forRoot(URI),
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
