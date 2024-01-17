import mongoose from "mongoose";

export const PlayerSchema = new mongoose.Schema({
  phoneNumber: String,
  email: { type: String, unique: true },
  name: String,
  rank: String,
  rankingPosition: Number,
  avatar: String,
}, {
  timestamps: true,
  collection: "players",
});
