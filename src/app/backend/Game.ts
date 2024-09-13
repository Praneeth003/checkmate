import { User } from "./User";

export class Game {
    player1: User;
    player2: User;
    // board is described as FEN notation
    board: string;
    moves: string[];
    startTime: Date;
    constructor(player1: User, player2: User) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
        this.moves = [];
        this.startTime = new Date();
    }
}