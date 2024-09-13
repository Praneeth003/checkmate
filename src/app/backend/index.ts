import { WebSocketServer } from 'ws';
import { GameControl } from './GameControl';

const wss = new WebSocketServer({ port: 8080 });

const gameControl = new GameControl();

wss.on('connection', function connection(ws) {

  gameControl.addUser(ws);

  ws.on('error', console.error);

  ws.on('disconnect', function disconnect() {
    gameControl.removeUser(ws);
  });

});
