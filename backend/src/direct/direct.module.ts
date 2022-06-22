import { Module } from '@nestjs/common';
import { DirectService } from './direct.service';
import { DirectGateway } from './direct.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectMessage } from './entities/direct-message.entity';
import { RelationsModule } from '../relations/relations.module';

@Module({
  imports: [TypeOrmModule.forFeature([DirectMessage]), RelationsModule],
  exports: [DirectService],
  providers: [DirectGateway, DirectService],
})
export class DirectModule {}
