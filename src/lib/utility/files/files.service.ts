import { HttpException } from '@nestjs/common';
import { extname } from 'path';

import { randomBytes } from 'crypto';


export const filterExtensionFiles = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/)) {
    return callback(
        new HttpException(
          [
            'FILE_EXTENSION_NOT_SUPPORTED',
            'File extension not supported'
          ],
          401
        ), false
    );
  }

  callback(null, true);
}

export const editNameFiles = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const crypto = randomBytes(16);
  const uuid = crypto.toString("hex")
  

  callback(null, `${uuid}${fileExtName}`);
}