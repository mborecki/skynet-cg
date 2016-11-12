(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
class AI {
    constructor() {
        this.paths = [];
    }
    setInitData(data) {
        this.gameState = data;
    }
    clear() {
        this.paths.length = 0;
    }
    findPaths() {
        let distanceArr = Array(this.gameState.nodesCount);
        let gateways = [];
        let nodeList = [];
        let add = (nodeId, distance) => {
            if (typeof distanceArr[nodeId] !== 'number') {
                nodeList.push(nodeId);
                distanceArr[nodeId] = distance;
                if (this.gameState.gateways.has(nodeId)) {
                    gateways.push(nodeId);
                }
            }
        };
        add(this.gameState.SI, 0);
        while (nodeList.length) {
            let pown = nodeList.shift();
            let distance = distanceArr[pown] || 0;
            this.gameState.graph.getAdjacent(pown).forEach((id) => {
                add(id, distance + 1);
            });
        }
        printErr('There is ' + gateways.length + ' paths.');
        gateways.forEach((g) => {
            this.paths.push(this.findPathTo(g, distanceArr));
        });
    }
    findPathTo(gateway, distanceArr) {
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
    getMove() {
        printErr('SI: ' + this.gameState.SI);
        this.clear();
        this.findPaths();
        let shortestPath = this.paths.sort((a, b) => {
            return a.length - b.length;
        })[0];
        this.paths.forEach((path) => {
            printErr('* ' + path);
        });
        return [this.gameState.SI, shortestPath[0]];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new AI();

},{}],2:[function(require,module,exports){
"use strict";
const game_state_1 = require('./game-state');
const ai_1 = require('./ai');
let gameData = new game_state_1.default();
ai_1.default.setInitData(gameData);
// game loop
while (true) {
    gameData.newTurn();
    // Write an action using print()
    // To debug: printErr('Debug messages...');
    // Example: 0 1 are the indices of the nodes you wish to sever the link between
    print(ai_1.default.getMove().join(' '));
}

},{"./ai":1,"./game-state":3}],3:[function(require,module,exports){
"use strict";
const graph_1 = require('./graph');
class GameState {
    constructor() {
        this.readInputData();
    }
    readInputData() {
        let inputs = readline().split(' ');
        this.N = parseInt(inputs[0]);
        this.E = parseInt(inputs[1]);
        this.G = parseInt(inputs[2]);
        this._graph = graph_1.default.create({
            nodes: this.N
        });
        for (let i = 0; i < this.E; i++) {
            let inputs = readline().split(' ');
            let N1 = parseInt(inputs[0]);
            let N2 = parseInt(inputs[1]);
            this._graph.insertEdge(N1, N2);
        }
        this.gateways = new Set();
        for (let i = 0; i < this.G; i++) {
            this.gateways.add(parseInt(readline()));
        }
    }
    newTurn() {
        this.SI = parseInt(readline());
    }
    get gatewaysCount() {
        return this.G;
    }
    get nodesCount() {
        return this.N;
    }
    get graph() {
        return this._graph;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GameState;

},{"./graph":4}],4:[function(require,module,exports){
"use strict";
class Graph {
    constructor(params) {
        this.adjacentMatrix = Array(params.nodes);
        this.nodes = Array(params.nodes);
        for (let i = 0; i < params.nodes; i++) {
            this.adjacentMatrix[i] = Array(params.nodes);
            this.nodes[i] = new Set();
        }
    }
    insertEdge(n1, n2) {
        this.adjacentMatrix[n1][n2] = true;
        this.adjacentMatrix[n2][n1] = true;
        this.nodes[n1].add(n2);
        this.nodes[n2].add(n1);
    }
    removeEdge(n1, n2) {
        this.adjacentMatrix[n1][n2] = false;
        this.adjacentMatrix[n2][n1] = false;
        this.nodes[n1].delete(n2);
        this.nodes[n2].delete(n1);
    }
    areAdjacent(n1, n2) {
        return !!this.adjacentMatrix[n1][n2];
    }
    getAdjacent(n) {
        // printErr('N: ' + n);
        // printErr(this.nodes[n].size);
        return Array.from(this.nodes[n]);
    }
}
exports.Graph = Graph;
class GraphFactory {
    static create(params) {
        return new Graph(params);
    }
}
exports.GraphFactory = GraphFactory;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GraphFactory;

},{}]},{},[2]);
