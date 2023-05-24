import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLessonsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsString()
  theoryContentUrl: string;

  @IsNotEmpty()
  @IsString()
  codeContentUrl: string;

  @IsNotEmpty()
  @IsString()
  codeFileExtension: string;
}
