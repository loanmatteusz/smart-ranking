import { Document } from "mongoose";
import { Player } from "src/modules/players/interfaces/player.interface";


export interface Event {
  name: string;
  operation: string;
  value: number;
}

export interface Category extends Document {
  readonly category: string;
  description: string;
  events: Array<Event>;
  players: Array<Player>;
}
