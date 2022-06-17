import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [FriendsService],
})
export class FriendsModule {}
