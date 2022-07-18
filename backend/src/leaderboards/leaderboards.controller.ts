import { Controller, Get } from '@nestjs/common';
import { LeaderboardsService } from './leaderboards.service';

@Controller('leaderboards')
export class LeaderboardsController {
  constructor(private readonly leaderboardService: LeaderboardsService) {}
  @Get()
  findAll() {
    return this.leaderboardService.findAll();
  }
}
