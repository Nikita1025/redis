import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsPublisher } from './redis/events.publisher';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventsPublisher: EventsPublisher,
  ) {}

  @Get('data')
  async getData() {
    return this.appService.getData();
  }

  @Post('publish')
  async publishEvent(@Body() body: { channel?: string; data?: any }) {
    const channel = body.channel || 'user.created';
    const payload = body.data || {
      id: Date.now(),
      name: 'Test User',
      email: 'test@example.com',
      createdAt: new Date().toISOString(),
    };

    const subscribersCount = await this.eventsPublisher.publish(
      channel,
      payload,
    );

    return {
      success: true,
      channel,
      payload,
      subscribersCount,
      message: `Сообщение опубликовано в канал "${channel}". Получено подписчиками: ${subscribersCount}`,
    };
  }
}
