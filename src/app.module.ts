import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseModule } from '@modules/firebase/firebase.module';
import { UserModule } from '@modules/user/user.module';
import { PageModule } from '@modules/page/page.module';
import { PageFollowModule } from '@modules/page-follow/page-follow.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    FirebaseModule,
    UserModule,
    PageModule,
    PageFollowModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
