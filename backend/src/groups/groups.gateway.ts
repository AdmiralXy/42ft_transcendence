import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayDisconnect,
  ConnectedSocket,
  OnGatewayInit,
  WsException,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Server, Socket } from 'socket.io';
import { CurrentUser } from '../app/decorators/current-user.decorator';
import { JwtWsAuthGuard } from '../auth/guards/jwt-ws-auth.guard';
import { GroupsCollection } from './collections/groups.collection';

@WebSocketGateway()
export class GroupsGateway implements OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  groups: GroupsCollection;

  constructor(private readonly groupsService: GroupsService) {}

  afterInit(): any {
    this.groups = new GroupsCollection();
  }

  handleDisconnect(client: Socket) {
    this.groups.removeUser(client);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('joinGroup')
  async joinGroup(
    @CurrentUser() user,
    @MessageBody('id') id: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!(await this.groupsService.isUserInGroup(+id, user.id))) {
      throw new WsException('You are not in this group.');
    }
    if (await this.groupsService.isUserBanned(+id, user.id)) {
      throw new WsException('You are banned from this group.');
    }
    this.groups.addUser(user.id, +id, client);
    client.join(id);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('createGroupMessage')
  async createGroupMessage(
    @CurrentUser() user,
    @MessageBody('id') id: string,
    @MessageBody('text') text: string,
  ) {
    if (!(await this.groupsService.isUserInGroup(+id, user.id))) {
      throw new WsException('You are not in this group.');
    }
    if (await this.groupsService.isUserBanned(+id, user.id)) {
      throw new WsException('You are banned from this group.');
    }
    if (await this.groupsService.isUserMuted(+id, user.id)) {
      throw new WsException('You are muted.');
    }
    const sender = await this.groupsService.getUserById(user.id);
    this.server.to(id).emit('groupMessage', {
      sender,
      text,
    });
  }

  @SubscribeMessage('userBanned')
  userBanned() {
    // TODO implement
  }
}
