import { Socket } from 'socket.io';

interface User {
  id: number;
  socketId: string;
  rating: number;
}

export class QueueCollection {
  users: User[] = [];

  addUser(userId: number, client: Socket, rating: number) {
    this.removeUser(client);
    this.users.push({ id: userId, socketId: client.id, rating });
  }

  removeUser(client: Socket) {
    const user = this.users.find((u) => u.socketId === client.id);
    if (user) {
      this.users = this.users.filter((u) => u.socketId !== client.id);
    }
  }

  removeUserById(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.users = this.users.filter((u) => u.id !== userId);
    }
  }
}
