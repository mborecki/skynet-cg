declare let printErr;

import GameState from './game-state';

class AI {
    private gameState: GameState;
    private paths: number[][];

    constructor() {
        this.paths = [];
    }

    setInitData (data : GameState) : void {
        this.gameState = data;
    }

    clear () {
        this.paths.length = 0;
    }

    findPaths () {

        let distanceArr = Array(this.gameState.nodesCount);
        let gateways = [];

        let nodeList = [];

        let add = (nodeId : number, distance : number) => {
            if (typeof distanceArr[nodeId] !== 'number' ) {
                nodeList.push(nodeId);
                distanceArr[nodeId] = distance;

                if (this.gameState.gateways.has(nodeId)) {
                    gateways.push(nodeId);
                }
            }
        }

        add(this.gameState.SI, 0);

        while (nodeList.length) {
            let pown = nodeList.shift();
            let distance = distanceArr[pown] || 0;

            this.gameState.graph.getAdjacent(pown).forEach((id : number) => {
                add(id, distance + 1);
            });
        }

        printErr('There is ' + gateways.length + ' paths.');

        gateways.forEach((g : number) => {
            this.paths.push(this.findPathTo(g, distanceArr));
        })
    }

    findPathTo (gateway : number, distanceArr : number[]) : number[]{
        let path = [];
        let si = this.gameState.SI;

        let pown = gateway;

        // printErr('SI: ' + si);

        while (si !== pown) {
            // printErr('POWN: ' + pown);
            // printErr(this.gameState.graph.getAdjacent(pown));
            path.push(pown);

            pown = this.gameState.graph.getAdjacent(pown).find((id) => {
                // printErr('disPOWN: ' + distanceArr[pown]);
                // printErr('id: ' + id + ' dist: ' + distanceArr[id]);
                return distanceArr[pown] === distanceArr[id] + 1;
            });
        }

        return path.reverse();
    }

    getMove () : number[] {
        printErr('SI: ' + this.gameState.SI);
        this.clear();
        this.findPaths();

        let shortestPath = this.paths.sort((a: number[], b: number[]) => {
            return a.length - b.length;
        })[0];

        this.paths.forEach((path) => {
            printErr('* ' + path);
        });

        return [this.gameState.SI, shortestPath[0]];
    }
}

export default new AI();

