import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';

@WebSocketGateway()
export class GroupsGateway {
  constructor(private readonly groupsService: GroupsService) {}

  @SubscribeMessage('createGroup')
  create(@MessageBody() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @SubscribeMessage('findAllGroups')
  findAll() {
    return this.groupsService.findAll();
  }

  @SubscribeMessage('findOneGroup')
  findOne(@MessageBody() id: number) {
    //return this.groupsService.findOne(id);
  }

  @SubscribeMessage('removeGroup')
  remove(@MessageBody() id: number) {
    return this.groupsService.remove(id);
  }
}
