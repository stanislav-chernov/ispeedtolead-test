import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CustomerDto } from '@/modules/item/dto/customer.dto';

export class CustomerPaginationDto extends PickType(PaginationDto, [
  'limit',
  'page',
  'totalDocs',
  'totalPages',
  'hasNextPage',
  'hasPrevPage',
]) {
  @ApiProperty({
    description: 'The list of items on the current page.',
    isArray: true,
  })
  @Type(() => CustomerDto)
  @Expose()
  docs: CustomerDto[];
}
