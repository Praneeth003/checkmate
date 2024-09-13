import WebSocket from "ws";
import { User } from "./User";
import { Game } from "./Game";


// Have to create proper Game and User Classes later
export class GameControl {
    private games: Game[];
    private pendingUser!: User;
    // users array will contain all the users who are currently active
    private users!: User[];

    constructor() {
        this.games = [];
    }
    // Add a pending user to the users array
    addUser(socket: User){
        this.users.push(socket);
        this.addHandler(socket);
    }

    // Stop the game as the user leaves
    removeUser(socket: WebSocket){
        // Have to change the logic here later
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandler(socket: WebSocket){
        socket.on('message', (message: string) => {
            const parsedMessage = JSON.parse(message);
            if(parsedMessage.type === 'init-game'){
                if(this.pendingUser){
                    // Start a new game
                } else {
                    this.pendingUser = socket;
                }
        }})
    }

}