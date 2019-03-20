import EventBus from "./eventBus";

const chars = {
    'user1': '1',
    'user2': '2',
};

class GameService {
    constructor() {
        this.whoseTurn = null;
        this.field = [
            ['*', '*', '*', '*'],
            ['*', '*', '*', '*'],
            ['*', '*', '*', '*'],
            ['*', '*', '*', '*']
        ];
        this.cellsCount = this.field.length * this.field[0].length;
        let bus = new EventBus();
        bus.attachToObject(this);
    };

    check(){
        if (this.cellsCount === 12){
            console.group("Game");
            console.log(`${this.whoseTurn.name} won!!!`);
            console.groupEnd();
            this.publish('win', {winner: this.whoseTurn.name});
        }
    }

    start() {
        console.group("Game");
        console.log("Game started!!!");
        this.publish('game:start', {players_num: this.listeners.length});
        this.whoseTurn = this.listeners[0];
        console.log(`Now is ${this.whoseTurn.name}'s turn`);
        console.groupEnd();
    }
}


let game = new GameService();

game.on('turn', function (args) {
    if (args.user === this.whoseTurn) {
        console.group("Game");
        this.field[args.d1][args.d2] = chars[this.whoseTurn.name];
        this.field.forEach(value => {
            console.log(value);
        });
        console.groupEnd();

        if (this.whoseTurn === this.listeners[0]){
            this.whoseTurn = this.listeners[1];
        } else {
            this.whoseTurn = this.listeners[0];
        }
        this.cellsCount--;
    }
}, game);

export default game;