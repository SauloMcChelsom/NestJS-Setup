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
import { Error } from '@root/src/shared/response/error.response';
import { Success } from '@root/src/shared/response/success.response';
import { OK } from '@root/src/shared/response/ok';
import { code } from '@root/src/shared/enum';
import {
  filterExtensionFiles,
  editNameFiles,
} from '@root/src/shared/utility/files/files.service';

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
  @UseFilters(Error)
  @UseInterceptors(Success)
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
  @UseFilters(Error)
  @UseInterceptors(Success)
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
