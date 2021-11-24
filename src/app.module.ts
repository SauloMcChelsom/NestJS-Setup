import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseModule } from '@modules/firebase/firebase.module';
import { UserModule } from '@modules/user/user.module';
import { PageModule } from '@modules/page/page.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    FirebaseModule,
    UserModule,
    PageModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
