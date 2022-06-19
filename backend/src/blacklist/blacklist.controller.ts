import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';

@Controller('users/:id/blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @Post()
  create(
    @Request() req,
    @Param('id') id: string,
    @Body() createBlacklistDto: CreateBlacklistDto,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('Unauthorized action.');
    }
    if (req.user.id === createBlacklistDto.id) {
      throw new BadRequestException('You cannot block yourself.');
    }
    return this.blacklistService.create(+id, createBlacklistDto);
  }

  @Get()
  findAll(@Request() req, @Param('id') id: string) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('Unauthorized action.');
    }
    return this.blacklistService.findAll(+id);
  }

  @Delete(':blockId')
  remove(
    @Request() req,
    @Param('id') id: string,
    @Param('blockId') blockId: string,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('Unauthorized action.');
    }
    return this.blacklistService.remove(+id, +blockId);
  }
}
