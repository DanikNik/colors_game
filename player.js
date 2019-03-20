import {PubSub} from "./eventBus";

export default class Player extends PubSub{
    constructor(name, game) {
        super();
        this.name = name;
        this.listeners.push(game);
    };

    //game is actually containing an event bus, handling messages sent by users
    doTurn(x, y) {
        this.publish('turn', {user: this, d1: x, d2: y});
    };
}