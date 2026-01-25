import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { EventsPublisher } from './events.publisher';
import { EventsSubscriber } from './events.subscriber';
import { RedisService } from './redis.service';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
        });
      },
    },
    {
      provide: 'REDIS_PUBLISHER',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
        });
      },
    },
    {
      provide: 'REDIS_SUBSCRIPTION',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
        });
      },
    },
    RedisService,
    EventsPublisher,
    EventsSubscriber,
  ],
  exports: [RedisService, EventsPublisher, EventsSubscriber],
})
export class RedisModule {}
