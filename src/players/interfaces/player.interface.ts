import { Document } from "mongoose";

export interface Player extends Document {
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  rank: string;
  rankingPosition: number;
  avatar: string;
}
