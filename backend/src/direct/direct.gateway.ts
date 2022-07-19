import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { DirectService } from './direct.service';
import { CreateDirectMessageDto } from './dto/create-direct-message.dto';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtWsAuthGuard } from '../auth/guards/jwt-ws-auth.guard';
import { CurrentUser } from '../app/decorators/current-user.decorator';

@WebSocketGateway()
export class DirectGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly directService: DirectService) {}

  @SubscribeMessage('createDirect')
  async create(@MessageBody() createDirectMessageDto: CreateDirectMessageDto) {
    const id = createDirectMessageDto.senderId;
    const friendId = createDirectMessageDto.receiverId;
    const message = await this.directService.create(createDirectMessageDto);
    this.server
      .to(id < friendId ? id + '-' + friendId : friendId + '-' + id)
      .emit('messageDirect', message);
    return message;
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('findAllDirect')
  findAll() {
    return this.directService.findAll();
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('joinDirect')
  join(
    @CurrentUser() user,
    @MessageBody('friendId') friendId: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.directService.join(user.id, +friendId, client);
  }
}
