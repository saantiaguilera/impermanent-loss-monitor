import poolsData from '../../config/pools.json'

export interface Pool {
    readonly name: string
    readonly chain: number
    readonly threshold: number
    readonly tokens: Token[]
}

export interface Token {
    readonly name: string
    readonly weight: number
    readonly address: string
    readonly startPrice: number
}

export const POOLS: Pool[] = ((): Pool[] => {
    let arr: Pool[] = []
    poolsData.forEach(element => {
        arr.push(element)
    });
    return arr
})()