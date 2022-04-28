import { Module } from '@nestjs/common';
import { IsValidTimestampService } from './is-valid-timestamp.service';

@Module({
  imports: [],
  providers: [IsValidTimestampService],
  exports: [IsValidTimestampService],
})
export class IsValidTimestampModule {}
