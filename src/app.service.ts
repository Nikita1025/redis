import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { EventsPublisher } from './redis/events.publisher';

@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService,
    private readonly eventsPublisher: EventsPublisher,
  ) {}

  async getData() {
    const cacheKey = 'redis-cache';
    const ttl = 10;

    let data = await this.redisService.get(cacheKey);
    let isCached = true;

    if (!data) {
      isCached = false;
      data = `Данные сгенерированы в: ${new Date().toISOString()}`;

      await this.redisService.set(cacheKey, data, ttl);
    }

    return {
      isCached,
      data,
      message: isCached ? 'Data fetch from cache' : 'Data fetch new  ',
    };
  }
}
