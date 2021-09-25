import { Pool } from "../domain/pool"
import { PoolToken } from "../domain/poolToken"

interface MessageRepository {
    sendMessage: (msg: string) => Promise<any>
}

interface PriceProvider {
    get: (token: string) => Promise<string>
}

export class ImpermanentLossMonitor {

    private messager: MessageRepository
    private priceProvider: PriceProvider

    constructor(priceProvider: PriceProvider, messager: MessageRepository) {
        this.priceProvider = priceProvider
        this.messager = messager
    }

    async monitor(pool: Pool) {
        // first slice queries all prices
        let prices: Map<PoolToken, Promise<string>> = new Map()
        pool.weightedTokens.forEach((_, key: PoolToken) => {
            prices.set(key, this.priceProvider.get(key.address))
        })

        // second slice computes the impermanent loss. Equation is as follows:
        // ((∏[i] => (Δp[i]USD) ** w[i]) / ∑[i] => (Δp[i]USD * w[i])) - 1
        // where w[i]: weight of token 'i'
        //       Δp[i]USD: price change of token 'i' in USD
        let nom = 1;
        let den = 0;
        for (const [key, value] of pool.weightedTokens) {
            const currPrice: number = parseFloat(await prices.get(key)!)
            const diff: number = currPrice / key.startPrice

            nom *= Math.pow(diff, value)
            den += diff * value
        }
        const il: number = Math.abs((nom / den) - 1)

        if ((il * 100) >= pool.threshold) {
            await this.messager.sendMessage(`[${pool.name} LP] Impermanent loss is higher than threshold (${pool.threshold}%): ${(il * 100).toFixed(2)}%`)
        }
    }
}