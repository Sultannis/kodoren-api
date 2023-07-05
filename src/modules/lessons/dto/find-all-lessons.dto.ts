import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class FindAllLessonsDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  perPage: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  courseId: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  userId?: number;
}
