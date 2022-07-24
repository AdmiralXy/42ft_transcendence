import { Server, Socket } from 'socket.io';
import { Match } from '../entities/match.entity';
import { MatchesService } from '../matches.service';

const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const BALL_SPEED = 10;
const PADDLE_SPEED = 7;
const SCORE_MAX = 11;

interface User {
  id: number;
  socketId: string;
}

interface Player {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  score: number;
}

interface Ball {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  speed: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
}

export enum State {
  WAITING,
  PLAYING,
}

class Game {
  state: State;
  server: Server;
  matchesService: MatchesService;
  matchId: number;
  users: User[];
  gameLoopId: any;
  player1: Player;
  player2: Player;
  ball: Ball;

  constructor(
    server: Server,
    matchesService: MatchesService,
    matchId: number,
    player1Id: number,
    player2Id: number,
  ) {
    this.state = State.WAITING;
    this.server = server;
    this.matchesService = matchesService;
    this.matchId = matchId;
    this.users = [];
    this.gameLoopId = null;
    this.player1 = {
      id: player1Id,
      x: 0,
      y: 540 / 2,
      width: 10,
      height: 115,
      speed: PADDLE_SPEED,
      score: 0,
    };
    this.player2 = {
      id: player2Id,
      x: 960 - 10,
      y: 540 / 2,
      width: 10,
      height: 115,
      speed: PADDLE_SPEED,
      score: 0,
    };
    this.ball = {
      x: 960 / 2,
      y: 540 / 2,
      width: 20,
      height: 20,
      angle: Math.PI / 4,
      speed: BALL_SPEED,
    };
  }

  getGameData(): any {
    return {
      player1: this.player1,
      player2: this.player2,
      ball: this.ball,
    };
  }

  startGameLoop(): void {
    this.gameLoopId = setInterval(() => {
      this.game();
      this.server
        .to(this.matchId.toString())
        .emit('matchUpdate', this.getGameData());
    }, 1000 / 40);
  }

  game(): void {
    this.ballMove();
  }

  ballMove(): void {
    // move ball according to angle
    this.ball.x += this.ball.speed * Math.cos(this.ball.angle);
    this.ball.y += this.ball.speed * Math.sin(this.ball.angle);
    if (!this.checkHitPlayer()) {
      this.checkOutOfBounds();
    }
  }

  playerMove(playerId: number, direction: Direction): void {
    if (playerId === this.player1.id) {
      if (direction === Direction.UP) {
        this.player1.y -= this.player1.speed;
      } else if (direction === Direction.DOWN) {
        this.player1.y += this.player1.speed;
      }
    } else if (playerId === this.player2.id) {
      if (direction === Direction.UP) {
        this.player2.y -= this.player2.speed;
      } else if (direction === Direction.DOWN) {
        this.player2.y += this.player2.speed;
      }
    }
    // check if player is out of bounds
    if (this.player1.y < 0) {
      this.player1.y = 0;
    } else if (this.player1.y > GAME_HEIGHT - this.player1.height) {
      this.player1.y = GAME_HEIGHT - this.player1.height;
    }
    if (this.player2.y < 0) {
      this.player2.y = 0;
    } else if (this.player2.y > GAME_HEIGHT - this.player2.height) {
      this.player2.y = GAME_HEIGHT - this.player2.height;
    }
  }

  checkOutOfBounds(): void {
    if (this.ball.x < 0) {
      this.ball.x = 0;
      this.ball.angle = Math.PI - this.ball.angle;
      this.player2.score++;
      // reset ball position
      this.ball.x = GAME_WIDTH / 2 - this.ball.width / 2;
      this.ball.y = GAME_HEIGHT / 2 - this.ball.height / 2;
      // reset ball angle
      this.ball.angle = Math.PI;
      if (this.player2.score === SCORE_MAX) {
        this.finishGame();
      }
    } else if (this.ball.x > GAME_WIDTH - this.ball.width) {
      this.ball.x = GAME_WIDTH - this.ball.width;
      this.ball.angle = Math.PI - this.ball.angle;
      this.player1.score++;
      // reset ball position
      this.ball.x = GAME_WIDTH / 2 - this.ball.width / 2;
      this.ball.y = GAME_HEIGHT / 2 - this.ball.height / 2;
      // reset ball angle
      this.ball.angle = 2 * Math.PI;
      if (this.player1.score === SCORE_MAX) {
        this.finishGame();
      }
    }
    if (this.ball.y < 0) {
      this.ball.y = 0;
      this.ball.angle = -this.ball.angle;
    } else if (this.ball.y > GAME_HEIGHT - this.ball.height) {
      this.ball.y = GAME_HEIGHT - this.ball.height;
      this.ball.angle = -this.ball.angle;
    }
  }

  private async finishGame() {
    clearInterval(this.gameLoopId);
    const winner =
      this.player1.score > this.player2.score ? this.player1 : this.player2;
    await this.matchesService.finishMatch(this.matchId, winner.id);
    await this.matchesService.findOneById(this.matchId).then((match) => {
      this.server
        .to(this.matchId.toString())
        .emit('matchFinished', { winner: match.winner.username });
    });
    this.server.to(this.matchId.toString()).disconnectSockets();
  }

  checkHitPlayer(): boolean {
    // check if ball hit player 1
    if (
      this.ball.x + this.ball.width > this.player1.x &&
      this.ball.x < this.player1.x + this.player1.width &&
      this.ball.y + this.ball.height > this.player1.y &&
      this.ball.y < this.player1.y + this.player1.height
    ) {
      this.ball.angle = this.generateRandomAngle(Math.PI / 4, Math.PI / 6);
      this.ball.x = this.player1.x + this.player1.width;
      return true;
    }
    // check if ball hit player 2
    if (
      this.ball.x + this.ball.width > this.player2.x &&
      this.ball.x < this.player2.x + this.player2.width &&
      this.ball.y + this.ball.height > this.player2.y &&
      this.ball.y < this.player2.y + this.player2.height
    ) {
      this.ball.angle = this.generateRandomAngle(
        (7 * Math.PI) / 6,
        (5 * Math.PI) / 4,
      );
      this.ball.x = this.player2.x - this.ball.width;
      return true;
    }
    return false;
  }

  generateRandomAngle(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}

export class GamesCollection {
  games: Game[] = [];

  constructor(
    private readonly server: Server,
    private readonly matchesService: MatchesService,
  ) {}

  private createGame(
    matchId: number,
    player1Id: number,
    player2Id: number,
  ): Game {
    const game = new Game(
      this.server,
      this.matchesService,
      matchId,
      player1Id,
      player2Id,
    );
    this.games.push(game);
    return game;
  }

  private findGame(matchId: number): Game {
    return this.games.find((game) => game.matchId === matchId);
  }

  connectUser(match: Match, userId: number, client: Socket) {
    this.removeUser(client);
    let game = this.findGame(match.id);
    if (!game) {
      game = this.createGame(match.id, match.player1.id, match.player2.id);
    }
    game.users.push({
      id: userId,
      socketId: client.id,
    });
    client.join(match.id.toString());
    if (
      game.state === State.WAITING &&
      game.users.find((user) => user.id === match.player1.id) &&
      game.users.find((user) => user.id === match.player2.id)
    ) {
      game.state = State.PLAYING;
      game.startGameLoop();
    }
  }

  removeUser(client: Socket) {
    this.games.forEach((game) => {
      const user = game.users.find((user) => user.socketId === client.id);
      if (user) {
        game.users = game.users.filter((user) => user.socketId !== client.id);
      }
      client.leave(game.matchId.toString());
      if (game.users.length === 0 && game.state !== State.PLAYING) {
        this.games = this.games.filter((game) => game.matchId !== game.matchId);
      }
    });
  }

  move(matchId: number, userId: number, direction: Direction) {
    const game = this.findGame(matchId);
    if (game && game.state === State.PLAYING) {
      game.playerMove(userId, direction);
    }
  }
}
