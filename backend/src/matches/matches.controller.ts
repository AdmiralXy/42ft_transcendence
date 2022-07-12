import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { IdRequestMatchGuard } from '../app/guards/id-request-match.guard';

@Controller('users/:id/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(IdRequestMatchGuard)
  @Get()
  findAll(@Param('id') id: string) {
    return this.matchesService.findAll(+id);
  }

  @UseGuards(IdRequestMatchGuard)
  @Get(':matchId')
  findOne(@Param('id') id: string, @Param('matchId') matchId: string) {
    return this.matchesService.findOne(+id, +matchId);
  }
}
