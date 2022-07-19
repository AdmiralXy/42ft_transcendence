import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserStatusService } from './user-status.service';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { CurrentUser } from '../app/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtWsAuthGuard } from '../auth/guards/jwt-ws-auth.guard';
import { UsersCollection } from './collection/users.collection';
import { Server, Socket } from 'socket.io';
import { Status } from '../user/enums/status.enum';

@WebSocketGateway()
export class UserStatusGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  users: UsersCollection = new UsersCollection();

  constructor(private readonly userStatusService: UserStatusService) {}

  handleDisconnect(client: any) {
    const user = this.users.getUserBySocket(client);
    if (user) {
      this.userStatusService.update(user.id, Status.OFFLINE);
    }
    this.users.removeUser(client);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('updateUserStatus')
  update(
    @CurrentUser() user,
    @MessageBody() updateUserStatusDto: UpdateUserStatusDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (this.users.getUserBySocket(client) === undefined) {
      this.users.addUser(user.id, client);
    }
    return this.userStatusService.update(user.id, updateUserStatusDto.status);
  }
}
