import {
  ConnectedSocket,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtWsAuthGuard } from '../auth/guards/jwt-ws-auth.guard';
import { CurrentUser } from '../app/decorators/current-user.decorator';
import { MatchesService } from '../matches/matches.service';
import { QueueCollection } from './collections/queue.collection';
import { Type } from '../matches/enums/type.enum';

@WebSocketGateway()
export class MatchmakingGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  queue: QueueCollection = new QueueCollection();

  constructor(private readonly matchesService: MatchesService) {}

  handleDisconnect(client: any): any {
    this.queue.removeUser(client);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('matchmakingJoin')
  async matchmakingJoin(
    @CurrentUser() user,
    @ConnectedSocket() client: Socket,
  ) {
    const rating = await this.matchesService.getRating(user.id);
    const enemy = this.queue.users.find(
      (u) => u.rating - rating <= 1000 && u.rating - rating >= -1000,
    );
    if (enemy) {
      this.queue.removeUserById(enemy.id);
      const match = await this.matchesService.create(
        user.id,
        enemy.id,
        Type.MATCHMAKING,
      );
      this.server.to(client.id).emit('matchmakingCreated', { id: match.id });
      this.server
        .to(enemy.socketId)
        .emit('matchmakingCreated', { id: match.id });
    } else {
      this.queue.addUser(user.id, client, rating);
    }
  }
}
