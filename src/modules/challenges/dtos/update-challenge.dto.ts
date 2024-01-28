import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { ChallengeResponseStatus } from "../interfaces/challenge-res-status.enum";

export class UpdateChallengeDto {
  @IsDateString()
  @IsOptional()
  challengeMoment: Date;

  @IsEnum(ChallengeResponseStatus)
  status: string;
}
