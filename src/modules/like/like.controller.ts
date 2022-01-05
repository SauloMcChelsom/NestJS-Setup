import { Controller, Headers, Post, Body } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'

import { LikeService } from './like.service'
import { CreateDto } from './dto/create.dto'
import { CreateInterface } from './interface/create.interface'

@ApiTags('like')
@Controller('like')
export class LikeController {

  constructor(private readonly service: LikeService, private modelFirebase:FirebaseModel, private modelUser:UserModel) {}

  @ApiOperation({ summary: 'Curtir uma publicação' })
  @Post('/auth/')
  public async createLike(@Body() body: CreateDto, @Headers('Authorization') authorization: string) {
    let token = await this.modelFirebase.isToken(authorization)
    const decoded = await this.modelFirebase.validateTokenByFirebase(token)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    const like:CreateInterface = {
      ...body,
      user_id: user.id
    }
   
    return await this.service.createLike(like);
  }
}
