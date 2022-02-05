import { Module, Global } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { HttpStatusCodes } from './exception/http-status-codes';

@Global()
@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService, HttpStatusCodes],
  exports: [CatsService]
})
export class CatsModule {}