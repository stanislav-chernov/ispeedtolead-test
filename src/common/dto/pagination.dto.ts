import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ description: 'The total number of documents available.' })
  @Expose()
  totalDocs: number;

  @ApiProperty({ description: 'The number of documents per page.' })
  @Expose()
  limit: number;

  @ApiProperty({ description: 'The total number of pages available.' })
  @Expose()
  totalPages: number;

  @ApiPropertyOptional({ description: 'The current page number.' })
  @Expose()
  page?: number;

  @ApiProperty({
    description: 'The serial counter for documents starting on this page.',
  })
  @Expose()
  pagingCounter: number;

  @ApiProperty({ description: 'Indicates whether there is a previous page.' })
  @Expose()
  hasPrevPage: boolean;

  @ApiProperty({ description: 'Indicates whether there is a next page.' })
  @Expose()
  hasNextPage: boolean;

  @ApiProperty({
    description:
      'The page number of the previous page if it exists, otherwise null.',
    nullable: true,
  })
  @Expose()
  prevPage?: number | null;

  @ApiPropertyOptional({
    description:
      'The page number of the next page if it exists, otherwise null.',
    nullable: true,
  })
  @Expose()
  nextPage?: number | null;
}
