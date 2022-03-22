import {
  Version,
  UploadedFile,
  UploadedFiles,
  Controller,
  Post,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UseInterceptors, UseFilters } from '@nestjs/common';
import { HttpExceptions } from '@root/src/lib/http-status/http-exception';
import { OK } from '@root/src/lib/http-status/ok';
import { HttpResponse } from '@root/src/lib/http-status/http-response';
import { code } from '@root/src/lib/enum';
import {
  filterExtensionFiles,
  editNameFiles,
} from '@lib/utility/files/files.service';

@Controller('services/upload')
@ApiTags('services/upload')
export class UploadController {
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
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Upload de um arquivo' })
  public async oneFile(
    @UploadedFile() file: Express.Multer.File,
    //@Headers('Authorization') authorization: string,
  ) {
    //const decoded = await this.firebase.validateTokenByFirebase(authorization)
    //const user = await this.user.getUserByUid(decoded.uid)

    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return new OK([response], code.SEND_WITH_SUCCESS);
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
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @ApiOperation({ summary: 'Upload de até 20 arquivos' })
  async multipleFiles(
    @UploadedFiles() files,
    //@Headers('Authorization') authorization: string,
  ) {
    //const decoded = await this.firebase.validateTokenByFirebase(authorization)
    //const user = await this.user.getUserByUid(decoded.uid)

    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return new OK([response], code.SEND_WITH_SUCCESS);
  }
}
