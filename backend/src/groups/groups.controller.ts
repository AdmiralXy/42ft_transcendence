import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Request,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { OwnerGuard } from './guard/owner.guard';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(
    @Request() req,
    @Param('id') id: string,
    @Body('password') password: string,
  ) {
    return this.groupsService.findOne(+id, +req.user.id, password);
  }

  @Patch(':id')
  @UseGuards(OwnerGuard)
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  @UseGuards(OwnerGuard)
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }

  // Admins (owner guard)

  @Post(':id/admin-list/:userId')
  @UseGuards(OwnerGuard)
  addAdmin(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  @Delete(':id/admin-list/:userId')
  removeAdmin(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  // Invite-list (admin guard)

  @Post(':id/invite-list/:userId')
  addToInviteList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  @Delete(':id/invite-list/:userId')
  removeFromInviteList(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    // TODO: implement
  }

  // Ban-list (admin guard)

  @Post(':id/ban-list/:userId')
  addToBanList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  @Delete(':id/ban-list/:userId')
  removeFromBanList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  // Mute-list (admin guard)

  @Post(':id/mute-list/:userId')
  addToMuteList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  @Delete(':id/mutelist/:userId')
  removeFromMuteList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }
}
