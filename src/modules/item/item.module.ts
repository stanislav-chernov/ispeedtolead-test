import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from '@/modules/item/item.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '@/modules/item/models/customer.model';
import { Account, AccountSchema } from '@/modules/item/models/account.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Account.name, schema: AccountSchema },
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
