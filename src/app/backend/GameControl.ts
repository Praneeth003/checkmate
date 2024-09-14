import WebSocket from "ws";
import { Game } from "./Game";


// Have to create proper Game and User Classes later
export class GameControl {
    private games: Game[];
    private pendingUser!: WebSocket | null;
    // users array will contain all the users who are currently active
    private users!: WebSocket[];

    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    // Add a pending user to the users array
    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    // Stop the game as the user leaves
    removeUser(socket: WebSocket){
        // Filter out the user based on their socket
        this.users = this.users.filter(user => user !== socket);
    }

    addHandler(socket: WebSocket){
        socket.on('message', (message: string) => {
            const parsedMessage = JSON.parse(message);

            // If the message is of type init-game, then start a new game or add the user to the pending users list accordingly
            if(parsedMessage.type === 'init-game'){
                if(this.pendingUser){
                    // Start a new game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;   
                }
        }
            // If the message is of type move, then check if the game exists
            if(parsedMessage.type === 'move'){
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    game.moves.push(parsedMessage.move);
                    game.board = parsedMessage.board;
                    const opponent = game.player1 === socket ? game.player2 : game.player1;
                    opponent.send(JSON.stringify({
                        type: 'move',
                        move: parsedMessage.move,
                        board: parsedMessage.board
                    }));
                }
            }
    })
    }

} 