import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Request,
  BadRequestException,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { IdRequestMatchGuard } from '../app/guards/id-request-match.guard';

@Controller('users/:id/friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(IdRequestMatchGuard)
  @Post()
  async create(
    @Request() req,
    @Param('id') id: string,
    @Body() createFriendDto: CreateFriendDto,
  ) {
    if (req.user.id === createFriendDto.id) {
      throw new BadRequestException('You cannot add yourself as a friend.');
    }
    return this.friendsService.create(+id, createFriendDto);
  }

  @UseGuards(IdRequestMatchGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Param('id') id: string) {
    return this.friendsService.findAll(+id);
  }

  @UseGuards(IdRequestMatchGuard)
  @Delete(':friendId')
  remove(@Param('id') id: string, @Param('friendId') friendId: string) {
    return this.friendsService.remove(+id, +friendId);
  }
}
