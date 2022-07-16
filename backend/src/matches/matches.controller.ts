import { Controller, Get, Param } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('users/:id/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  findAll(@Param('id') id: string) {
    return this.matchesService.findAll(+id);
  }

  @Get('rating')
  getRating(@Param('id') id: string) {
    return this.matchesService.getRating(+id);
  }

  @Get(':matchId')
  findOne(@Param('id') id: string, @Param('matchId') matchId: string) {
    return this.matchesService.findOne(+id, +matchId);
  }
}
