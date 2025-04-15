import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ description: 'The page number to fetch', example: 1 })
  @IsOptional()
  page: number = 1;

  @ApiProperty({ description: 'The number of items per page', example: 10 })
  @IsOptional()
  limit: number = 10;
}
