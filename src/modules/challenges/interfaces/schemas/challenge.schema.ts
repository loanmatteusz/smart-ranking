import mongoose from "mongoose";
import { ChallengeStatus } from "../challenge-status.enum";

export const ChallengeSchema = new mongoose.Schema({
  challengeMoment: { type: Date },
  status: { type: String, default: ChallengeStatus.PENDING },
  requestMoment: { type: Date, default: new Date() },
  responseMoment: { type: Date },
  chellenger: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  category: { type: String },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
}, { timestamps: true, collection: "challenges" });
