import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsGateway } from './groups.gateway';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Ban } from './entities/ban.entity';
import { Mute } from './entities/mute.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    TypeOrmModule.forFeature([Group, Ban, Mute, User]),
    MatchesModule,
  ],
  providers: [GroupsGateway, GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
