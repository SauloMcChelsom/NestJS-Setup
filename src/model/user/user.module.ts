import { Module, Global } from '@nestjs/common';
import { UserModel } from './user.model';

@Global()
@Module({
  imports: [],
  providers: [UserModel],
  exports: [UserModel],
})
export class JwtDecodeModule {}