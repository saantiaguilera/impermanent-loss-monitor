import { PoolToken } from "./poolToken";

export class Pool {
    name: string
    threshold: number
    weightedTokens: Map<PoolToken, number>

    constructor(name: string, threshold: number, wt: Map<PoolToken, number>) {
        this.name = name
        this.threshold = threshold
        this.weightedTokens = wt
    }
}