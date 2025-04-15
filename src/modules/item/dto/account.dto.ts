import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ExposeObjectId } from '@/common/decorators/expose-object-id.decorator';

export class AccountDto {
  @ApiProperty({ description: 'The unique identifier of the account.' })
  @ExposeObjectId()
  @Expose()
  _id: string;

  @ApiProperty({
    description: 'The account number associated with the account.',
  })
  @Expose()
  account_id: number;

  @ApiProperty({ description: 'The account limit.' })
  @Expose()
  limit: number;

  @ApiProperty({
    description: 'A list of products associated with the account.',
  })
  @Expose()
  products: string[];
}
