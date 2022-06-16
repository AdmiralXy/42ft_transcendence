import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { SkipAuth } from '../app/decorators/skip-auth.decorator';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../app/config/multer.config';
import * as fs from 'fs';

@Controller('uploads')
export class UploadsController {
  constructor(private uploadService: UploadsService) {}
  @Get(':filename')
  @SkipAuth()
  async getImage(@Param('filename') filename) {
    return this.uploadService.getImage(filename);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(@Request() req, @Param('id') id, @UploadedFile() file) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('You can only update your own profile.');
    }
    fs.rename(
      './uploads/' + file.filename,
      './uploads/' + id + '.png',
      function (error) {
        if (error) throw new BadRequestException('Given file is invalid.');
      },
    );
    return {
      original_name: file.originalname,
      filename: file.filename,
    };
  }
}
