import { Module } from '@nestjs/common';
import { UserStatusService } from './user-status.service';
import { UserStatusGateway } from './user-status.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [UserStatusGateway, UserStatusService],
})
export class UserStatusModule {}
