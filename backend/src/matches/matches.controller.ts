import { Controller, Get, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller()
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('users/:id/matches')
  findAll(@Param('id') id: string) {
    return this.matchesService.findAll(+id);
  }

  @Get('matches/:matchId')
  findOne(@Param('matchId') matchId: string) {
    return this.matchesService.findOneById(+matchId);
  }

  @Get('users/:id/rating')
  getRating(@Param('id') id: string) {
    return this.matchesService.getRating(+id);
  }
}
