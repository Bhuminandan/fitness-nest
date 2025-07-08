import { Test, TestingModule } from '@nestjs/testing';
import { ShardService } from './shard.service';

describe('ShardService', () => {
  let service: ShardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShardService],
    }).compile();

    service = module.get<ShardService>(ShardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
