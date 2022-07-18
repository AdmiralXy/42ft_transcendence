import { Module } from '@nestjs/common';
import { LeaderboardsService } from './leaderboards.service';
import { LeaderboardsController } from './leaderboards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Match } from '../matches/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, User])],
  controllers: [LeaderboardsController],
  providers: [LeaderboardsService],
})
export class LeaderboardsModule {}
