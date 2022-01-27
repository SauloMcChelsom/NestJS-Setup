import { Version, UploadedFile,  UploadedFiles, Res, UseInterceptors, Controller, Headers, Param, Get, Query, Post, Body, Put  } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { OK } from '@root/src/lib/exception/exception'
import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'
import { filterExtensionFiles, editNameFiles } from '@lib/utility/files/files.service';

@Controller('cdn/upload')
@ApiTags('cdn/upload')
export class UploadController {

  constructor(private firebase:FirebaseService,private user:UserService) {}

  @Post('/auth/one-file')
  @Version('1')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './CDN',
        filename: editNameFiles,
      }),
      fileFilter: filterExtensionFiles,
    }),
  )
  @ApiOperation({ summary: 'Upload de um arquivo' })
  public async oneFile(@UploadedFile() file: Express.Multer.File, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)

    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return new OK([response], 'SEND_WITH_SUCCESS','Send with success')
  }

  @Post('/auth/multiple-file')
  @Version('1')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './CDN',
        filename: editNameFiles,
      }),
      fileFilter: filterExtensionFiles,
    }),
  )
  @ApiOperation({ summary: 'Upload de até 20 arquivos' })
  async multipleFiles(@UploadedFiles() files, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)

    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return new OK([response], 'SEND_WITH_SUCCESS','Send with success')
  }
  
}
