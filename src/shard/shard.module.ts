import { Module } from '@nestjs/common';
import { ShardService } from './shard.service';
import { ShardNames } from 'src/common/constants/shard.enum';
import { DataSource } from 'typeorm';

@Module({
    imports: [],
    providers: [ShardService,
    ],
    exports: [],    
})
export class ShardModule {}
