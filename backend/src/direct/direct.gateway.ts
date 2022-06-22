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

@WebSocketGateway()
export class DirectGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly directService: DirectService) {}

  @SubscribeMessage('createDirect')
  async create(@MessageBody() createDirectMessageDto: CreateDirectMessageDto) {
    // if (req.user.id != createDirectMessageDto.senderId) {
    //   throw new WsException('Unauthorized action.');
    // }
    const id = createDirectMessageDto.senderId;
    const friendId = createDirectMessageDto.receiverId;
    const message = await this.directService.create(createDirectMessageDto);
    this.server
      .to(id < friendId ? id + '-' + friendId : friendId + '-' + id)
      .emit('messageDirect', message);
    return message;
  }

  @SubscribeMessage('findAllDirect')
  findAll() {
    return this.directService.findAll();
  }

  @SubscribeMessage('joinDirect')
  join(
    @MessageBody('id') id: string,
    @MessageBody('friendId') friendId: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.directService.join(+id, +friendId, client);
  }
}
