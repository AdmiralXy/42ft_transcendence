import { Module } from '@nestjs/common';
import { DirectService } from './direct.service';
import { DirectGateway } from './direct.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectMessage } from './entities/direct-message.entity';
import { RelationsModule } from '../relations/relations.module';
import { User } from '../user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, DirectMessage]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6000s' },
    }),
    RelationsModule,
  ],
  exports: [DirectService],
  providers: [DirectGateway, DirectService],
})
export class DirectModule {}
