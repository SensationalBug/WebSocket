import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  id: string;

  @IsString()
  createdBy: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  categoryName: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  categoryIcon: string;

  @IsBoolean()
  isDefault: boolean;
}
