import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseModule } from '@modules/firebase/firebase.module';
import { UserModule } from '@modules/user/user.module';
import { PageModule } from '@modules/page/page.module';
import { PageSegmentsModule } from '@root/src/modules/page-segments/page-segments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    FirebaseModule,
    UserModule,
    PageModule,
    PageSegmentsModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
