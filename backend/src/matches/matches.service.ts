import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
  ) {}

  findAll(userId: number) {
    return this.matchesRepository.findOne({
      where: [{ player1: { id: userId } }, { player2: { id: userId } }],
      relations: ['player1', 'player2'],
    });
  }

  findOne(userId: number, matchId: number) {
    return this.matchesRepository.findOne({
      where: [
        { id: matchId, player1: { id: userId } },
        { id: matchId, player2: { id: userId } },
      ],
      relations: ['player1', 'player2'],
    });
  }
}
