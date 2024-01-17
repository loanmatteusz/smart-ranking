import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
