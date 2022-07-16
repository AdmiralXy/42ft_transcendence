import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtWsAuthGuard } from '../auth/guards/jwt-ws-auth.guard';
import { CurrentUser } from '../app/decorators/current-user.decorator';
import { MatchesService } from './matches.service';
import { Direction, GamesCollection } from './collections/games.collection';

@WebSocketGateway()
export class MatchesGateway implements OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  games: GamesCollection;

  constructor(private readonly matchesService: MatchesService) {}

  afterInit(): any {
    this.games = new GamesCollection(this.server, this.matchesService);
  }

  handleDisconnect(client: any): any {
    this.games.removeUser(client);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('matchJoin')
  async matchJoin(
    @CurrentUser() user,
    @MessageBody('matchId') matchId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const match = await this.matchesService.findOneById(matchId);
    if (!match) {
      throw new WsException('Match not found');
    }
    if (match.winner !== null) {
      throw new WsException('Match is finished');
    }
    this.games.connectUser(match, user.id, client);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('matchMove')
  async matchMove(
    @CurrentUser() user,
    @MessageBody('matchId') matchId: number,
    @MessageBody('direction') direction: Direction,
  ) {
    const match = await this.matchesService.findOneById(matchId);
    if (!match) {
      throw new WsException('Match not found');
    }
    if (match.player1.id !== user.id && match.player2.id !== user.id) {
      throw new WsException('You are not in the match players');
    }
    this.games.move(match.id, user.id, direction);
  }
}
