import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post(':id/add/:friendId')
  sendRequest(
    @Request() req,
    @Param('id') id: number,
    @Param('friendId') friendId: number,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('Unauthorized action.');
    }
    return this.friendsService.sendRequest(id, friendId);
  }

  @Get(':id')
  findAll(@Request() req, @Param('id') id: string) {
    return this.friendsService.findAll(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.friendsService.findOne(+id);
  // }

  @Delete(':id/add/:friendId')
  remove(
    @Request() req,
    @Param('id') id: number,
    @Param('friendId') friendId: number,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('You can only update your own profile.');
    }
    return this.friendsService.remove(+id);
  }
}
