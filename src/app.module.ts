import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

const URI = "mongodb+srv://dev29cz:dev123@smart-ranking.0yhjfjx.mongodb.net/smart-ranking-db?retryWrites=true&w=majority";

@Module({
  imports: [
    MongooseModule.forRoot(URI),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
