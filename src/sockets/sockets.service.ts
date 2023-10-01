import { Injectable } from '@nestjs/common';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io.connect('localhost:8888'); // Replace with your server's URL and port
  }

  sendData(data: any): void {
    // Emit your data to the server
    this.socket.emit('data-event', data);
  }
}
