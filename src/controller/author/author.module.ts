import { Module } from '@nestjs/common'

import { JwtLocalModule } from '@root/src/model/jwt-local/jwt-local.module'
import { UsersModule } from '@model/users/user.module'

import { AuthMapper } from './mapper/index.mapper'
import { AuthorController } from './author.controller'
import { AuthorService } from './author.service'

@Module({
    imports: [
        JwtLocalModule,
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
