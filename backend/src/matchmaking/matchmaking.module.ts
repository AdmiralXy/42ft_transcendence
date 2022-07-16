import { Module } from '@nestjs/common';
import { MatchmakingGateway } from './matchmaking.gateway';
import { JwtModule } from '@nestjs/jwt';
import { Match } from '../matches/entities/match.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    MatchesModule,
  ],
  providers: [MatchmakingGateway],
})
export class MatchmakingModule {}
