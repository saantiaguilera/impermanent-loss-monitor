import chains from '../../config/chains.json';
import { BscPriceProvider } from './service/price/bsc/priceProvider';

interface Chain {
    readonly id: number
    readonly node_url: string
    readonly pivot_token: string
}

export interface PriceProvider {

    get: (tokenAddress: string) => Promise<string>
}

export const CHAIN_PROVIDERS: Map<number, PriceProvider> = ((): Map<number, PriceProvider> => {
    const bscProvider: Chain = chains["bsc"]

    const map: Map<number, PriceProvider> = new Map()
    map.set(bscProvider.id, new BscPriceProvider(bscProvider.node_url, bscProvider.pivot_token))
    return map
})()