import { WebSocket } from "ws";
import { Chess } from "chess.js";
export class Game {
    player1: WebSocket;
    player2: WebSocket;
    // board is described as FEN notation
    board: Chess;
    moves: string[];
    startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
    }

    makeMove(socket: WebSocket, move: string ){
        // Check if the move is valid
        // Check if it is the player's turn
        // Check if the move is valid
        // Update the board
        // Check if the game is over
        // Send the move to the opponent


    }
}