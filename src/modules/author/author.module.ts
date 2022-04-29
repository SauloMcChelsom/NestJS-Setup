import { Module } from '@nestjs/common'

import { AuthModule } from '@model/auth/auth.module'
import { UsersModule } from '@model/users/user.module'

import { AuthMapper } from './mapper/index.mapper'
import { AuthorController } from './author.controller'
import { AuthorService } from './author.service'

@Module({
    imports: [
        AuthModule,
        UsersModule
    ],
    controllers: [AuthorController],
    providers: [
        AuthorService, 
        AuthMapper
    ],
    exports: [AuthorService]
})
export class AuthorModule {}
