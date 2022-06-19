import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UnauthorizedException,
  Request,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';

@Controller('users/:id/friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  create(
    @Request() req,
    @Param('id') id: string,
    @Body() createFriendDto: CreateFriendDto,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('Unauthorized action.');
    }
    if (req.user.id === createFriendDto.id) {
      throw new BadRequestException('You cannot add yourself as a friend.');
    }
    return this.friendsService.create(+id, createFriendDto);
  }

  @Get()
  findAll(@Request() req, @Param('id') id: string) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('Unauthorized action.');
    }
    return this.friendsService.findAll(+id);
  }

  @Delete(':friendId')
  remove(
    @Request() req,
    @Param('id') id: string,
    @Param('friendId') friendId: string,
  ) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('Unauthorized action.');
    }
    return this.friendsService.remove(+id, +friendId);
  }

  // @Get(':id')
  // findAll(@Request() req, @Param('id') id: string) {
  //   return this.friendsService.findAll(+id);
  // }
  //
  // @Post(':id/add/:friendId')
  // sendRequest(
  //   @Request() req,
  //   @Param('id') id: number,
  //   @Param('friendId') friendId: number,
  // ) {
  //   if (req.user.id !== +id) {
  //     throw new UnauthorizedException('Unauthorized action.');
  //   }
  //   if (req.user.id === +friendId) {
  //     throw new BadRequestException(
  //       `You can't send a friend request to yourself.`,
  //     );
  //   }
  //   return this.friendsService.sendRequest(+id, +friendId);
  // }
  //
  // @Patch(':id/accept/:friendId')
  // acceptRequest(
  //   @Request() req,
  //   @Param('id') id: number,
  //   @Param('friendId') friendId: number,
  // ) {
  //   if (req.user.id !== +id) {
  //     throw new UnauthorizedException('Unauthorized action.');
  //   }
  //   if (req.user.id === +friendId) {
  //     throw new BadRequestException(
  //       `You can't send a friend request to yourself.`,
  //     );
  //   }
  //   return this.friendsService.acceptRequest(+id, +friendId);
  // }
  //
  // @Delete(':id/remove/:friendId')
  // remove(
  //   @Request() req,
  //   @Param('id') id: number,
  //   @Param('friendId') friendId: number,
  // ) {
  //   if (req.user.id !== +id) {
  //     throw new UnauthorizedException('You can only update your own profile.');
  //   }
  //   return this.friendsService.remove(+id);
  // }
}
