import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'The login/username of the user.',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description:
      'The password for the user. Must be at least 8 characters long.',
    example: 'P@ssw0rd123',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
