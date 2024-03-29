import { Socket } from 'socket.io';

interface User {
  id: number;
  socketId: string;
}

interface Group {
  id: number;
  users: User[];
}

export class GroupsCollection {
  groups: Group[] = [];

  addUser(userId: number, groupId: number, client: Socket) {
    this.removeUser(client);
    const user = { id: userId, socketId: client.id };
    const group = this.findGroupById(groupId);
    if (group) {
      group.users.push(user);
    } else {
      this.groups.push({ id: groupId, users: [user] });
    }
    client.join(groupId.toString());
  }

  removeUser(client: Socket) {
    const groups = this.groups.filter((g) =>
      g.users.find((u) => u.socketId === client.id),
    );
    groups.forEach((g) => {
      const user = g.users.find((u) => u.socketId === client.id);
      if (user) {
        g.users = g.users.filter((u) => u.socketId !== client.id);
        client.leave(g.id.toString());
      }
    });
    this.groups = this.groups.filter((g) => g.users.length > 0);
  }

  removeUserById(userId: number) {
    const groups = this.groups.filter((g) =>
      g.users.find((u) => u.id === userId),
    );
    groups.forEach((g) => {
      const user = g.users.find((u) => u.id === userId);
      if (user) {
        g.users = g.users.filter((u) => u.id !== userId);
      }
    });
    this.groups = this.groups.filter((g) => g.users.length > 0);
  }

  getUser(userId: number) {
    const group = this.groups.find((g) => g.users.find((u) => u.id === userId));
    return group ? group.users.find((u) => u.id === userId) : null;
  }

  private findGroupById(groupId: number) {
    return this.groups.find((g) => g.id === groupId);
  }
}
