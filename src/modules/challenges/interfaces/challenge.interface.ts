import { Document } from "mongoose";
import { Player } from "src/modules/players/interfaces/player.interface";
import { ChallengeStatus } from "./challenge-status.enum";
import { Match } from "./match.interface";


export interface Challenge extends Document {
  challengeMoment: Date;
  status: ChallengeStatus;
  requestMoment: Date;
  responseMoment: Date;
  chellenger: Player;
  category: string;
  players: Array<Player>;
  match: Match;
}
