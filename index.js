import game from "./game";
import Player from "./player";


let isEnded = false;

let player1 = new Player("user1", game);
let player2 = new Player("user2", game);

[player1, player2].forEach(player => {
    player.on('notification', args => {
        console.group(player.name);
        console.log(`${player.name} has been notified`);
        console.log(args);
        console.groupEnd();
    }).on('game:start', args => {
        console.group(player.name);
        console.log(`${player.name} is ready for battle!`);
        console.groupEnd();
    }).on('win', args => {
        if (player.name === game.whoseTurn.name) {
            console.group(player.name);
            console.log(`I WON!!!!!!`);
            console.groupEnd();
        }
        isEnded = true;
    })
});


game.addListener(player1);
game.addListener(player2);
// game.publish('notification', {qwe: "qwe"});

game.start();

while (true) {
    let x = prompt(`${game.whoseTurn.name}, take your turn: x`);
    let y = prompt(`${game.whoseTurn.name}, take your turn: y`);
    game.whoseTurn.doTurn(x, y);
    game.check();
    if (isEnded) {
        console.log('GAME ENDED');
        break;
    }
}