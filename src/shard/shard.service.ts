// src/shard/shard.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ShardNames } from '../common/constants/shard.enum';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ShardService {
  constructor(
    @InjectDataSource(ShardNames.SHARD1) private readonly shard1: DataSource,
    @InjectDataSource(ShardNames.SHARD2) private readonly shard2: DataSource,
  ) {}

  getShard(userId: string): DataSource {
    return parseInt(userId) % 2 === 0 ? this.shard1 : this.shard2;
  }
}
