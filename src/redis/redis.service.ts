import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async set(key: string, value: any, ttl: number): Promise<string> {
    return this.redisClient.set(key, value, 'EX', ttl);
  }

  async get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async onModuleDestroy(): Promise<void> {
    await this.redisClient.quit();
  }
}
