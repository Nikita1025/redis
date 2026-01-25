import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class EventsPublisher {
  constructor(@Inject('REDIS_PUBLISHER') private readonly redisClient: Redis) {}

  async publish(channel: string, payload: any): Promise<number> {
    return this.redisClient.publish(channel, JSON.stringify(payload));
  }
}
