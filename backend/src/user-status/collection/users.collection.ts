import { Socket } from 'socket.io';

interface User {
  id: number;
  socketId: string;
}

export class UsersCollection {
  users: User[] = [];

  addUser(userId: number, client: Socket) {
    this.removeUser(client);
    this.users.push({ id: userId, socketId: client.id });
  }

  removeUser(client: Socket) {
    const user = this.users.find((u) => u.socketId === client.id);
    if (user) {
      this.users = this.users.filter((u) => u.socketId !== client.id);
    }
  }

  getUserBySocket(client: Socket) {
    return this.users.find((u) => u.socketId === client.id);
  }
}
