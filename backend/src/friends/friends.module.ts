import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entity/friend-request.entity';
import { UserModule } from '../user/user.module';
import { RelationsModule } from '../relations/relations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequest]),
    UserModule,
    RelationsModule,
  ],
  providers: [FriendsService],
  exports: [FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
