import { Module } from '@nestjs/common';
import { AuthModel } from './auth.model';

@Module({
  imports: [],
  providers: [AuthModel],
  exports: [AuthModel],
})
export class AuthModule {}