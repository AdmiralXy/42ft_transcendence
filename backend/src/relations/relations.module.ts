import { Module } from '@nestjs/common';
import { RelationsService } from './relations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from '../friends/entity/friend-request.entity';
import { Blacklist } from '../blacklist/entities/blacklist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequest]),
    TypeOrmModule.forFeature([Blacklist]),
  ],
  providers: [RelationsService],
  exports: [RelationsService],
})
export class RelationsModule {}
