// src/config/env.validation.ts
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

class EnvironmentVariables {
  // SHARD 1
  @IsString()
  DB_HOST_1: string;

  @IsNumber()
  DB_PORT_1: number;

  @IsString()
  DB_USER_1: string;

  @IsString()
  DB_PASSWORD_1: string;

  @IsString()
  DB_NAME_1: string;

  // SHARD 2
  @IsString()
  DB_HOST_2: string;

  @IsNumber()
  DB_PORT_2: number;

  @IsString()
  DB_USER_2: string;

  @IsString()
  DB_PASSWORD_2: string;

  @IsString()
  DB_NAME_2: string;
}

export function validateEnv(config: Record<string, any>) {
  const finalConfig = {
    ...config,
    DB_PORT_1: parseInt(config.DB_PORT_1, 10),
    DB_PORT_2: parseInt(config.DB_PORT_2, 10),
  };

  const validatedConfig = plainToInstance(EnvironmentVariables, finalConfig, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`❌ Invalid environment variables:\n${errors}`);
  }

  return validatedConfig;
}
