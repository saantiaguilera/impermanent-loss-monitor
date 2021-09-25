import axios from 'axios'

import { CHAIN_PROVIDERS } from './chainProvider'
import { Pool } from './domain/pool'
import { PoolToken } from './domain/poolToken'
import { POOLS } from './pools'
import { TelegramClient } from './service/telegram/client'
import { TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID } from './telegram'
import { ImpermanentLossMonitor } from './usecase/monitorImpermanentLoss'

async function main() {
    const tgClient: TelegramClient = new TelegramClient(axios, TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID)

    POOLS.forEach(pool => {
        const provider = CHAIN_PROVIDERS.get(pool.chain)
        if (provider == undefined) {
            throw new Error("unsupported chain")
        }
        
        const uc = new ImpermanentLossMonitor(provider, tgClient)

        uc.monitor(new Pool(pool.name, pool.threshold, pool.tokens.reduce((map, e) => {
            map.set(new PoolToken(e.name, e.address, e.startPrice), e.weight)
            return map
        }, new Map<PoolToken, number>())))
    })
}
  
main()