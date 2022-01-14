import { Controller, Headers, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'
import { OK } from '@root/src/shared/exception/exception'
import { code, message } from '@shared/enum'

import { LikeService } from './like.service'
import { CreateDto } from './dto/create.dto'
import { CreateInterface } from './interface/create.interface'
import { CreateMapper } from './mapper/create.mapper'

@ApiTags('like')
@Controller('like')
export class LikeController {

  constructor(
    private readonly service: LikeService, 
    private firebase:FirebaseService, 
    private user:UserService,
    private createMapper:CreateMapper
  ) {}

  @ApiOperation({ summary: 'Curtir uma publicação' })
  @Post('/auth/')
  public async create(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)

    const like:CreateInterface = {
      ...body,
      user_id: user.id
    }
    let res = await this.service.create(like);
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }
}
