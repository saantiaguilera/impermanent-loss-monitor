import { Fetcher, ChainId, Token } from '@pancakeswap/sdk';
import { JsonRpcProvider } from '@ethersproject/providers';

export class BscPriceProvider {

    private provider: JsonRpcProvider;
    private pivotToken: Token

    constructor(mainnetUrl: string, pivotTokenAddr: string) {
        this.provider = new JsonRpcProvider(mainnetUrl);
        this.pivotToken = new Token(ChainId.MAINNET, pivotTokenAddr, 18);
    }

    async get(address: string): Promise<string> {
        const token = await Fetcher.fetchTokenData(
            ChainId.MAINNET,
            address,
            this.provider,
        );
        const pair = await Fetcher.fetchPairData(this.pivotToken, token, this.provider);
        const price = pair.token0Price.toSignificant(10);
        return price;
    }
}