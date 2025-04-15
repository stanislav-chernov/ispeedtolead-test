import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ExposeObjectId } from '@/common/decorators/expose-object-id.decorator';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier for the user.',
    example: '64df1b8978442c70e6245ec1',
  })
  @ExposeObjectId()
  @Expose()
  _id: string;

  @ApiProperty({
    description: 'The login/username of the user.',
    example: 'john_doe',
  })
  @Expose()
  login: string;

  @ApiProperty({
    description: 'The timestamp when the user was created.',
    example: '2023-10-25T14:48:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the user was last updated.',
    example: '2023-10-26T18:32:00.000Z',
  })
  @Expose()
  updatedAt: Date;
}
