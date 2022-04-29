import { Module, Global } from '@nestjs/common';
import { JwtDecodeService } from './jwt-decode.service';

@Global()
@Module({
  imports: [],
  providers: [JwtDecodeService],
  exports: [JwtDecodeService],
})
export class JwtDecodeModule {}