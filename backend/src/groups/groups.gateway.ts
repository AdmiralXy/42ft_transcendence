import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayDisconnect,
  ConnectedSocket,
  OnGatewayInit,
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

  // handleDisconnect -> remove user from channels array
  // createGroupMessage -> user send message, translate to all users in this channel
  // joinGroup -> user try to join channel, if success, join to channel room by id and add user in channels array
  // also add in users database array and emit cSC
  // groupStateChanged -> send to all users that channelStateChanged
  // userBanned -> send to user that he is banned and disconnect him

  afterInit(): any {
    this.groups = new GroupsCollection();
  }

  handleDisconnect(client: Socket) {
    this.groups.removeUser(client);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('joinGroup')
  joinGroup(
    @CurrentUser() user,
    @MessageBody('id') id: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.groupsService.isUserInGroup(user.id, +id)) {
      return;
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
      return;
    }
    const sender = await this.groupsService.getUserById(user.id);
    this.server.to(id).emit('groupMessage', {
      sender,
      text,
    });
  }

  // @SubscribeMessage('groupStateChanged')
  // groupStateChanged() {
  //   console.log('received changed event!');
  //   // TODO implement
  // }

  @SubscribeMessage('userBanned')
  userBanned() {
    // TODO implement
  }
}
