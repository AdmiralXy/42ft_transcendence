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
import { OwnerGuard } from './guards/owner.guard';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AdminGuard } from './guards/admin.guard';

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
  findOne(@Request() req, @Param('id') id: string) {
    return this.groupsService.findOne(+req.user.id, +id);
  }

  @Post(':id')
  join(
    @Request() req,
    @Param('id') id: string,
    @Body('password') password: string,
  ) {
    return this.groupsService.join(+req.user.id, +id, password);
  }

  // emit channelStateChanged event
  @UseGuards(OwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @UseGuards(OwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }

  // Admins (owner guards)

  @UseGuards(OwnerGuard)
  @Post(':id/admin-list')
  async addAdmin(@Param('id') id: string, @Body('userId') userId: string) {
    await this.groupsService.addAdmin(+id, +userId);
  }

  @UseGuards(OwnerGuard)
  @Delete(':id/admin-list')
  async removeAdmin(@Param('id') id: string, @Body('userId') userId: string) {
    await this.groupsService.removeAdmin(+id, +userId);
  }

  // Invite-list (admin guards)

  @UseGuards(AdminGuard)
  @Post(':id/invite-list/:userId')
  addToInviteList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  @UseGuards(AdminGuard)
  @Delete(':id/invite-list/:userId')
  removeFromInviteList(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    // TODO: implement
  }

  // Ban-list (admin guards)

  @UseGuards(AdminGuard)
  @Post(':id/ban-list/:userId')
  addToBanList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  @UseGuards(AdminGuard)
  @Delete(':id/ban-list/:userId')
  removeFromBanList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  // Mute-list (admin guards)

  @UseGuards(AdminGuard)
  @Post(':id/mute-list/:userId')
  addToMuteList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }

  @UseGuards(AdminGuard)
  @Delete(':id/mutelist/:userId')
  removeFromMuteList(@Param('id') id: string, @Param('userId') userId: string) {
    // TODO: implement
  }
}
