declare let readline;

import GraphFactory, {Graph} from './graph';

export default class GameState {
    private _graph : Graph;
    gateways : Set<number>;

    private N : number; // nodes number;
    private E : number; // edges number;
    private G : number; // gateways number;

    public SI : number; // SI position

    constructor () {
        this.readInputData();
    }

    private readInputData () {
        let inputs : string[] = readline().split(' ');

        this.N = parseInt(inputs[0]);
        this.E = parseInt(inputs[1]);
        this.G = parseInt(inputs[2]);

        this._graph = GraphFactory.create({
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

    newTurn () : void {
        this.SI = parseInt(readline());
    }

    get gatewaysCount() : number {
        return this.G;
    }

    get nodesCount() : number {
        return this.N;
    }

    get graph() : Graph {
        return this._graph;
    }
}
