import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsNumber()
  lessonId: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  codeToInclude: string[] = [];

  @IsOptional()
  @IsString()
  codeToExclude: string[] = [];
}
