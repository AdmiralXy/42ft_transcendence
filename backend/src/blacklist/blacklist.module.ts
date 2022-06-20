import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blacklist } from './entities/blacklist.entity';
import { UserModule } from '../user/user.module';
import { RelationsModule } from '../relations/relations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist]), UserModule, RelationsModule],
  providers: [BlacklistService],
  exports: [BlacklistService],
  controllers: [BlacklistController],
})
export class BlacklistModule {}
