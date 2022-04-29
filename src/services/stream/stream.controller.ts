import { Version, Headers, Res, Controller, Param, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//import { UserModel } from '@model/users/user.model';

@Controller('services/stream')
@ApiTags('services/stream')
export class StreamController {
  //constructor(private user: UserModel) {}

  @Get('/public/:path')
  @Version('1')
  @ApiOperation({ summary: 'Criar um comentario' })
  public async publicStream(@Param('path') path, @Res() res) {
    return res.sendFile(path, { root: './CDN' });
  }

  @Get('/auth/:path')
  @Version('1')
  @ApiOperation({ summary: 'Criar um comentario' })
  public async authStream(
    @Param('path') path,
    @Res() res,
    @Headers('Authorization') authorization: string,
  ) {
    //const decoded = await this.firebase.validateTokenByFirebase(authorization);
    //await this.user.getUserByUid('decoded.uid');

    return res.sendFile(path, { root: './CDN' });
  }
}
