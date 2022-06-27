import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { IdRequestMatchGuard } from '../app/guards/id-request-match.guard';

@Controller('users/:id/blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @UseGuards(IdRequestMatchGuard)
  @Post()
  create(
    @Request() req,
    @Param('id') id: string,
    @Body() createBlacklistDto: CreateBlacklistDto,
  ) {
    if (req.user.id === createBlacklistDto.id) {
      throw new BadRequestException('You cannot block yourself.');
    }
    return this.blacklistService.create(+id, createBlacklistDto);
  }

  @UseGuards(IdRequestMatchGuard)
  @Get()
  findAll(@Param('id') id: string) {
    return this.blacklistService.findAll(+id);
  }

  @UseGuards(IdRequestMatchGuard)
  @Delete(':blockId')
  remove(@Param('id') id: string, @Param('blockId') blockId: string) {
    return this.blacklistService.remove(+id, +blockId);
  }
}
