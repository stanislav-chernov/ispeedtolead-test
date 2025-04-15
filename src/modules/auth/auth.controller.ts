import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from '@/modules/auth/dto/register.dto';
import { UserService } from '@/modules/user/user.service';
import { TokenResponseDto } from '@/modules/auth/dto/token-response.dto';
import { AuthService } from '@/modules/auth/auth.service';
import { Public } from '@/common/decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { UserDto } from '@/modules/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiBody({
    description: 'Register a new user',
    type: RegisterDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'A user with the given login already exists.',
    schema: {
      example: {
        message: 'User already with login johndoe exists',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed for the request body.',
    schema: {
      example: {
        message: ['password must be longer than or equal to 8 characters'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<TokenResponseDto> {
    const existUser = await this.userService.findByLogin(registerDto.login);
    if (existUser) {
      throw new ConflictException(
        `User already with login ${existUser.login} exists`,
      );
    }
    const userDto = await this.userService.createUser(registerDto);
    return {
      token: this.authService.generateJwtToken(userDto),
    };
  }

  @ApiBody({
    description: 'User login credentials',
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully authenticated.',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid login or password provided.',
    schema: {
      example: {
        message: 'Invalid credentials',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed for the request body.',
    schema: {
      example: {
        message: ['password must not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @HttpCode(200)
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
    const userDto = await this.userService.findByLogin(loginDto.login);
    if (!userDto) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    const passwordIsValid = await this.userService.passwordIsValid(
      userDto._id,
      loginDto.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    return {
      token: this.authService.generateJwtToken(userDto),
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Token is valid and user data is returned.',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Provided toke is invalid provided.',
    schema: {
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiBearerAuth()
  @Get('/validate')
  async validate(@CurrentUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}
