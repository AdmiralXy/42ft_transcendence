import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadsService {
  async getImage(filename: string) {
    let file;
    const path = './uploads/' + filename;
    if (fs.existsSync(path)) file = createReadStream(join(process.cwd(), path));
    else file = createReadStream(join(process.cwd(), '/uploads/default.png'));
    return new StreamableFile(file);
  }
}
