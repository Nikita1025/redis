import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class EventsSubscriber implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('REDIS_SUBSCRIPTION') private readonly redisClient: Redis,
  ) {}

  async onModuleInit() {
    await this.redisClient.subscribe('user.created');

    this.redisClient.on('message', (channel, message) => {
      if (channel === 'user.created') {
        try {
          const data = JSON.parse(message);
          console.log('📨 Получено сообщение из канала', channel, ':', data);
        } catch (error) {
          console.error(
            `Ошибка парсинга сообщения из канала ${channel}:`,
            error,
          );
        }
      }
    });
  }

  async onModuleDestroy() {
    await this.redisClient.unsubscribe();
    await this.redisClient.quit();
  }

  subscribe(channel: string, callback: (data: any) => void): void {
    this.redisClient.subscribe(channel);

    this.redisClient.on('message', (receivedChannel, message) => {
      if (receivedChannel === channel) {
        try {
          const data = JSON.parse(message);
          callback(data);
        } catch (error) {
          console.error(
            `Error parsing message from channel ${channel}:`,
            error,
          );
        }
      }
    });
  }

  async unsubscribe(channel: string): Promise<void> {
    await this.redisClient.unsubscribe(channel);
  }
}
