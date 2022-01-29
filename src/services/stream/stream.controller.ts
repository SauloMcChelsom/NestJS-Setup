import { Version, Headers, Res, Controller, Param, Get  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'

@Controller('services/stream')
@ApiTags('services/stream')
export class StreamController {

  constructor(private firebase:FirebaseService, private user:UserService) {}

  @Get('/public/:path')
  @Version('1')
  @ApiOperation({ summary: 'Criar um comentario' })
  public async publicStream(@Param('path') path, @Res() res) {
    return res.sendFile(path, { root: './CDN' });
  }

  @Get('/auth/:path')
  @Version('1')
  @ApiOperation({ summary: 'Criar um comentario' })
  public async authStream(@Param('path') path, @Res() res, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
   
    return res.sendFile(path, { root: './CDN' });
  }

}