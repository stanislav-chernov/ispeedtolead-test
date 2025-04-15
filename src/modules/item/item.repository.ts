import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateResult } from 'mongoose';
import {
  Customer,
  CustomerDocument,
} from '@/modules/item/models/customer.model';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async getPaginatedList(
    page: number,
    limit: number,
  ): Promise<PaginateResult<CustomerDocument>> {
    return this.customerModel
      .find()
      .paginate({ page, limit, populate: ['accountsRefs'] });
  }
}
