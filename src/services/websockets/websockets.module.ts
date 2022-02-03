import { Module } from '@nestjs/common';
import { EventsModule } from './events-sample/events.module';

@Module({
    imports: [
        EventsModule
    ],
    providers: [],
    exports: []
  })
export class WebSocketsModule {}