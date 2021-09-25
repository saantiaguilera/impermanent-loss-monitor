import chains from '../../config/chains.json';

import { BscPriceProvider } from './service/price/bsc/priceProvider';

interface PriceProvider {

    get: (tokenAddress: string) => Promise<string>
}

const BSC_PROVIDER = chains["bsc"]

export const CHAIN_PROVIDERS: Map<number, PriceProvider> = ((): Map<number, PriceProvider> => {
    const map: Map<number, PriceProvider> = new Map()
    map.set(BSC_PROVIDER.id, new BscPriceProvider(BSC_PROVIDER.node_url, BSC_PROVIDER.pivot_token))
    return map
})()