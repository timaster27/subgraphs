import {Address, BigInt, ethereum} from "@graphprotocol/graph-ts"
import {Quote} from "../../../generated/schema"
import {updateDailyHistory, zero_address} from "../../utils"
import {Handler} from "./Handler"
import {QuoteStatus} from "../../config"
import {Version} from "../../../common/BaseHandler";
import {LiquidatePositionsPartyA, symmio_0_8_2} from "../../../generated/symmio_0_8_2/symmio_0_8_2";

export class LiquidatePositionsHandler<T> extends Handler<T> {
    event: LiquidatePositionsPartyA
    user: Address
    account: Address

    constructor(_event: ethereum.Event) {
        super(_event)
        // @ts-ignore
        const event = changetype<LiquidatePositionsPartyA>(_event) // LiquidatePositionsPartyA, LiquidatePositionsPartyB have the same event signature
        this.user = super.getOwner(event.params.partyA)
        this.account = event.params.partyA
        this.event = event
    }

    public handle(_event: ethereum.Event, version: Version): void {
        const ids = this.event.params.quoteIds
        for (let i = 0; i < ids.length; i++) {
            this._handle(ids[i])
        }
    }

    private _handle(quoteId: BigInt): void {
        if (this.user == zero_address) return
        const tradeVolume = this.getVolume(quoteId)
        updateDailyHistory(this.user, this.account, this.day, tradeVolume, BigInt.zero(), this.timestamp) // user volume tracker
    }

    public getVolume(quoteId: BigInt): BigInt {
        const quote = Quote.load(quoteId.toString())
        if (quote == null) return BigInt.zero()

        quote.quoteStatus = QuoteStatus.LIQUIDATED
        quote.lastUpdate = this.event.block.timestamp
        quote.closeDay = this.day
        quote.save()

        let symmioContract = symmio_0_8_2.bind(this.event.address)

        const callResult = symmioContract.try_getQuote(quoteId)
        if (callResult.reverted) return BigInt.zero() //FIXME
        let chainQuote = callResult.value
        const liquidAmount = quote.quantity.minus(quote.closedAmount)
        const liquidPrice = chainQuote.avgClosedPrice.times(quote.quantity).minus(quote.avgClosedPrice.times(quote.closedAmount)).div(liquidAmount)
        return liquidAmount.times(liquidPrice).div(BigInt.fromString("10").pow(18))
    }
}
