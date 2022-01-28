import { extname } from 'path';
import { Exception } from '@root/src/lib/exception/exception'

import { randomBytes } from 'crypto';


export const filterExtensionFiles = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/)) {
    return callback(
        new Exception({
            code:'FILE_EXTENSION_NOT_SUPPORTED',
            message:'File extension not supported'
        },401), false
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