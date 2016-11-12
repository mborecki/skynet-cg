declare let print;

import GameState from './game-state';
import AI from './ai';

let gameData = new GameState();

AI.setInitData(gameData);

// game loop
while (true) {
    gameData.newTurn();

    // Write an action using print()
    // To debug: printErr('Debug messages...');


    // Example: 0 1 are the indices of the nodes you wish to sever the link between
    print(AI.getMove().join(' '));
}
