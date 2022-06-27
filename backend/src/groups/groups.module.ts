import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsGateway } from './groups.gateway';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Ban } from './entities/ban.entity';
import { Mute } from './entities/mute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Ban, Mute])],
  providers: [GroupsGateway, GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
