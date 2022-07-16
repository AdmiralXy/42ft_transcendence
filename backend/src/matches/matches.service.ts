import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { Type } from './enums/type.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
  ) {}

  BASE_RATING = 3000;
  BASE_RATING_MODIFIER = 25;

  async create(userId: number, enemyId: number, type: Type) {
    return await this.matchesRepository.save({
      player1: { id: userId },
      player2: { id: enemyId },
      type: type,
    });
  }

  async findAll(userId: number) {
    return await this.matchesRepository.find({
      where: [{ player1: { id: userId } }, { player2: { id: userId } }],
      relations: ['player1', 'player2', 'winner'],
    });
  }

  async getRating(userId: number) {
    const matches = (await this.findAll(userId))
      .filter((match) => match.winner !== null)
      .filter((match) => match.type === Type.MATCHMAKING);
    const wins = matches.filter((match) => match.winner.id === userId);
    const losses = matches.filter((match) => match.winner.id !== userId);
    return (
      wins.length * this.BASE_RATING_MODIFIER -
      losses.length * this.BASE_RATING_MODIFIER +
      this.BASE_RATING
    );
  }

  async findOne(userId: number, matchId: number) {
    return await this.matchesRepository.findOne({
      where: [
        { id: matchId, player1: { id: userId } },
        { id: matchId, player2: { id: userId } },
      ],
      relations: ['player1', 'player2', 'winner'],
    });
  }

  async findOneById(matchId: number) {
    return await this.matchesRepository.findOne({
      where: { id: matchId },
      relations: ['player1', 'player2', 'winner'],
    });
  }

  async finishMatch(matchId: number, winnerId: number) {
    const match = await this.findOneById(matchId);
    const user = new User();
    user.id = winnerId;
    match.winner = user;
    await this.matchesRepository.save(match);
  }
}
