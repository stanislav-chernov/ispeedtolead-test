import { Controller, Get, Query } from '@nestjs/common';
import { ItemService } from '@/modules/item/item.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { CustomerPaginationDto } from '@/modules/item/dto/customer-pagination.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Get a paginated list of items' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'The current page number. Defaults to 1',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'The number of items per page. Defaults to 10',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'A paginated list of items',
    type: CustomerPaginationDto,
  })
  @ApiBearerAuth()
  @Get()
  async getPaginatedItems(
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<CustomerPaginationDto> {
    return this.itemService.getPaginatedList(paginationQueryDto);
  }
}
