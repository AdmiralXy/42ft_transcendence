import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../matches/entities/match.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Type } from '../matches/enums/type.enum';

// SELECT u.id, COUNT(u.ID) AS matches,
//     sum(case when m."winnerId" = u.id then 1 else 0 end) AS wins,
//     sum(case when m."winnerId" != u.id then 1 else 0 end) AS losses
// FROM "user" as u LEFT OUTER JOIN match m on (u.id = m."player1Id" OR u.id = m."player2Id")
// GROUP BY u.id ORDER BY COUNT(u.id) DESC

@Injectable()
export class LeaderboardsService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const matches = (
      await this.matchesRepository.find({
        relations: ['player1', 'player2', 'winner'],
      })
    ).filter(
      (match) => match.winner !== null && match.type === Type.MATCHMAKING,
    );
    const users = await this.usersRepository.find();
    const leaderboard = users.map((user) => {
      const userMatches = matches.filter(
        (match) => match.player1.id === user.id || match.player2.id === user.id,
      );
      const wins = userMatches.filter((match) => match.winner.id === user.id);
      const losses = userMatches.filter((match) => match.winner.id !== user.id);
      return {
        user,
        matches: userMatches.length,
        wins: wins.length,
        losses: losses.length,
        rating: wins.length * 25 - losses.length * 25 + 3000,
      };
    });
    return leaderboard.sort((a, b) => b.rating - a.rating).slice(0, 4);
  }
}
