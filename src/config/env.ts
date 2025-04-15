import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, validateSync } from 'class-validator';
import { EnvValidationException } from '@/common/exceptions/env-validation.exception';

enum Environment {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGE = 'stage',
  PRODUCTION = 'production',
}

export interface Env {
  NODE_ENV: Environment;
  JWT_SECRET: string;
  MONGO_URL: string;
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  MONGO_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new EnvValidationException(errors.toString());
  }
  return validatedConfig;
}
