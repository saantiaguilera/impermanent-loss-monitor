import { JsonRpcProvider } from '@ethersproject/providers';
import { Fetcher, ChainId, Token } from '@pancakeswap/sdk';

export class BscPriceProvider {

    private provider: JsonRpcProvider;
    private pivotToken: Token

    constructor(mainnetUrl: string, pivotTokenAddr: string) {
        this.provider = new JsonRpcProvider(mainnetUrl);
        this.pivotToken = new Token(ChainId.MAINNET, pivotTokenAddr, 18);
    }

    async get(address: string): Promise<string> {
        if (address == this.pivotToken.address) {
            return "1" // pivot is this, so value is 1
        }

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