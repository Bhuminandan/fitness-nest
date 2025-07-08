import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { ShardService } from './shard/shard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import { ShardNames } from './common/constants/shard.enum';
import { DataSourceOptions } from 'typeorm';
import { ShardModule } from './shard/shard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
      validate: validateEnv,
    }),

    // Shard 1
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: ShardNames.SHARD1,
      useFactory: async (
        configService: ConfigService,
      ): Promise<DataSourceOptions> => {
        const shard1Config = configService.get<DataSourceOptions>(
          ShardNames.SHARD1,
        );
        console.log('Shard 1 Config:', shard1Config);
        return shard1Config!;
      },
    }),

    // Shard 2
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: ShardNames.SHARD2,
      useFactory: async (
        configService: ConfigService,
      ): Promise<DataSourceOptions> => {
        const shard2Config = configService.get<DataSourceOptions>(
          ShardNames.SHARD2,
        );
        console.log('Config:', configService.get('typeorm'));
        console.log('Shard 2 Config:', shard2Config);
        return shard2Config!;
      },
    }),
    UserModule,
    MessageModule,
    ShardModule,
  ],
  controllers: [AppController],
  providers: [AppService, ShardService],
})
export class AppModule {}
