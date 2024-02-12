import { IsDateString, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class getCarsDto {
  @IsString()
  name?: string;

  @IsString()
  model?: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsNumber()
  @Max(1000000)
  maxPrice?: number;
}
