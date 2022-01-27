import { Version, UploadedFile, UseInterceptors, Controller, Headers, Param, Get, Query, Post, Body, Put  } from '@nestjs/common'

import {

  UploadedFiles,
  Res,
  
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utilis/file-upload.utils';
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FirebaseService } from '@modules/firebase/firebase.service'
import { UserService } from '@modules/user/user.service'


@Controller('streaming')
@ApiTags('streaming')
export class StreamingController {

  constructor(
    private firebase:FirebaseService,
    private user:UserService
  ) {}

  @Post('/auth/')
  @Version('1')
  @ApiOperation({ summary: 'Criar um comentario' })
  public async create(@Body() body: any, @Headers('Authorization') authorization: string) {
    const decoded = await this.firebase.validateTokenByFirebase(authorization)
    const user = await this.user.getUserByUid(decoded.uid)
   
    return {}
  }

  @Post('/public/upload-one-file')
  @Version('1')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadOneFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }


  @Post('/public/upload-multiple-file')
  @Version('1')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('/public/show-file/:path')
  @Version('1')
  seeUploadedFile(@Param('path') path, @Res() res) {
    return res.sendFile(path, { root: './files' });
  }

}
