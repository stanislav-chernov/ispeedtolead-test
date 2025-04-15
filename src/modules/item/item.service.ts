import { Injectable } from '@nestjs/common';
import { ItemRepository } from '@/modules/item/item.repository';
import { Mapper } from '@/common/utils/mapper.util';
import { CustomerPaginationDto } from '@/modules/item/dto/customer-pagination.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getPaginatedList(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<CustomerPaginationDto> {
    const { page, limit } = paginationQueryDto;
    const paginatedItems = await this.itemRepository.getPaginatedList(
      page,
      limit,
    );
    return Mapper.plainToDto(CustomerPaginationDto, paginatedItems);
  }
}
