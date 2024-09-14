export class User{
    user: WebSocket;
    socket: any;
    constructor(user: WebSocket){
        this.user = user;
    }
}