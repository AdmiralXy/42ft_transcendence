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
import { GroupsGateway } from './groups.gateway';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly groupsGateway: GroupsGateway,
  ) {}

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
    this.groupsGateway.server.emit('groupStateChanged');
  }

  @UseGuards(OwnerGuard)
  @Delete(':id/admin-list')
  async removeAdmin(@Param('id') id: string, @Body('userId') userId: string) {
    await this.groupsService.removeAdmin(+id, +userId);
    this.groupsGateway.server.emit('groupStateChanged');
  }

  // Invite-list (admin guards)

  @UseGuards(AdminGuard)
  @Post(':id/invite-list')
  async addToInviteList(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    await this.groupsService.addToInviteList(+id, +userId);
  }

  @UseGuards(AdminGuard)
  @Delete(':id/invite-list')
  async removeFromInviteList(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    await this.groupsService.removeFromInviteList(+id, +userId);
  }

  // Ban-list (admin guards)

  @UseGuards(AdminGuard)
  @Post(':id/ban-list')
  async addToBanList(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body('seconds') seconds: string,
  ) {
    await this.groupsService.addToBanList(+id, +userId, +seconds);
    await this.groupsGateway.groups.removeUserById(+userId);
  }

  @UseGuards(AdminGuard)
  @Delete(':id/ban-list')
  async removeFromBanList(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    await this.groupsService.removeFromBanList(+id, +userId);
  }

  // Mute-list (admin guards)

  @UseGuards(AdminGuard)
  @Post(':id/mute-list')
  async addToMuteList(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body('seconds') seconds: string,
  ) {
    await this.groupsService.addToMuteList(+id, +userId, +seconds);
  }

  @UseGuards(AdminGuard)
  @Delete(':id/mute-list')
  async removeFromMuteList(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ) {
    await this.groupsService.removeFromMuteList(+id, +userId);
  }
}
