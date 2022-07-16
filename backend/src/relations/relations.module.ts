import { Module } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from '../friends/entities/friend-request.entity';
import { Blacklist } from '../blacklist/entities/blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, Blacklist])],
  providers: [RelationsService],
  exports: [RelationsService],
})
export class RelationsModule {}
