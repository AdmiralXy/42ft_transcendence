import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../user/user.service';
import { multerOptions } from '../app/config/multer.config';
import { createReadStream } from 'fs';
import { join } from 'path';
import { SkipAuth } from '../app/decorators/skip-auth.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private userService: UserService) {}
  @Get(':id')
  index(@Request() req) {
    return this.userService.findByLogin(req.params.id);
  }

  @Patch(':id')
  update(@Param('id') id, @Request() req) {
    return this.userService.update(id, req.body);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(@Param('id') id, @UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    try {
      await this.userService.update(id, { avatar: file.filename });
    } catch (e) {
      throw new HttpException(
        { message: 'Image is invalid' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return response;
  }

  @Get('/uploads/:image')
  @SkipAuth()
  async getImage(@Param('image') image) {
    const file = createReadStream(join(process.cwd(), '/uploads/' + image));
    return new StreamableFile(file);
  }
}
