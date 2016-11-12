type GraphParams = {
    nodes: number;
}

declare let printErr;

export class Graph {
    private adjacentMatrix : boolean[][];
    private nodes : Set<number>[];

    constructor (params : GraphParams) {
        this.adjacentMatrix = Array(params.nodes);
        this.nodes = Array(params.nodes);

        for (let i = 0; i < params.nodes; i++) {
            this.adjacentMatrix[i] = Array(params.nodes);
            this.nodes[i] = new Set();
        }
    }

    insertEdge (n1: number, n2: number) : void {
        this.adjacentMatrix[n1][n2] = true;
        this.adjacentMatrix[n2][n1] = true;

        this.nodes[n1].add(n2);
        this.nodes[n2].add(n1);
    }

    removeEdge (n1: number, n2: number) : void {
        this.adjacentMatrix[n1][n2] = false;
        this.adjacentMatrix[n2][n1] = false;

        this.nodes[n1].delete(n2);
        this.nodes[n2].delete(n1);
    }

    areAdjacent (n1: number, n2: number) : boolean {
        return !!this.adjacentMatrix[n1][n2];
    }

    getAdjacent (n : number) : number[] {
        // printErr('N: ' + n);
        // printErr(this.nodes[n].size);
        return Array.from(this.nodes[n]);
    }
}

export class GraphFactory {
    static create (params: GraphParams) : Graph {
        return new Graph(params);
    }
}

export default GraphFactory;
