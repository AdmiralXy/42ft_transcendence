import { Module } from '@nestjs/common';
import { ToodsService } from './toods.service';
import { ToodsController } from './toods.controller';

@Module({
  controllers: [ToodsController],
  providers: [ToodsService]
})
export class ToodsModule {}
