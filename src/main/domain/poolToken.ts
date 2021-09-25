export class PoolToken {
    name: string
    address: string
    startPrice: number

    constructor(name: string, addr: string, sp: number) {
        this.name = name
        this.address = addr
        this.startPrice = sp
    }
}