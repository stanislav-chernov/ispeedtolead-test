import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The login/username of the user.',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'The password for the user.',
    example: 'P@ssw0rd123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
