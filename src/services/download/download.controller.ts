import {
  Controller,
  Param,
  Response,
  Version,
  Get,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('services/download')
@ApiTags('services/download')
export class DownloadController {
  @Get(':path')
  @Version('1')
  getFile(
    @Param('path') path,
    @Response({ passthrough: true }) res,
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), `./CDN/${path}`));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${path}"`,
    });
    return new StreamableFile(file);
  }
}
