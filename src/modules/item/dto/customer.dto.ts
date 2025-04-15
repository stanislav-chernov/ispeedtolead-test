import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from '@/modules/item/dto/account.dto';
import { ExposeObjectId } from '@/common/decorators/expose-object-id.decorator';

export class CustomerDto {
  @ApiProperty({ description: 'The unique identifier for the customer.' })
  @ExposeObjectId()
  @Expose()
  _id: string;

  @ApiProperty({ description: 'The username of the customer.' })
  @Expose()
  username: string;

  @ApiProperty({
    description: 'The full name of the customer.',
    required: false,
  })
  @Expose()
  name?: string;

  @ApiProperty({ description: 'The address of the customer.', required: false })
  @Expose()
  address?: string;

  @ApiProperty({
    description: 'The birthdate of the customer.',
    required: false,
  })
  @Expose()
  birthdate?: Date;

  @ApiProperty({ description: 'The email address of the customer.' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'Indicates whether the customer is active.' })
  @Expose()
  active: boolean;

  @ApiProperty({
    description: 'A list of basic accounts represented by their numbers.',
    required: false,
  })
  @Expose()
  accounts?: number[];

  @ApiProperty({
    description: 'References to detailed account information.',
    type: () => [AccountDto],
    required: false,
  })
  @ExposeObjectId()
  @Type(() => AccountDto)
  @Expose()
  accountsRefs?: AccountDto[];

  @ApiProperty({
    description: "The customer's tier and related details.",
    required: false,
  })
  @Expose()
  tier_and_details?: Record<string, TierAndDetailsDto>;
}

export class TierAndDetailsDto {
  @ApiProperty({ description: 'The ID of the tier detail.', required: false })
  @Expose()
  id?: string;

  @ApiProperty({ description: 'The tier of the customer.', required: false })
  @Expose()
  tier?: string;

  @ApiProperty({
    description: 'A list of benefits for the customer.',
    type: [String],
    required: false,
  })
  @Expose()
  benefits?: string[];

  @ApiProperty({ description: 'Indicates whether this tier is active.' })
  @Expose()
  active: boolean;
}
