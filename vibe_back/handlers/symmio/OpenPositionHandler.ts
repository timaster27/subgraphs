import {Address, BigInt, ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {Handler} from "../common/Handler";
import {OpenPosition} from "../../../generated/symmio_0_8_2/symmio_0_8_2";
import {updateDailyHistory, zero_address} from "../../utils";
import {Quote, Symbol} from "../../../generated/schema";
import {QuoteStatus} from "../../config";

export class OpenPositionHandler<T> extends Handler<T> {
    event: OpenPosition
    user: Address
    account: Address

    constructor(_event: OpenPosition) {
        super(_event)
        this.user = super.getOwner(_event.params.partyA)
        this.account = _event.params.partyA
        this.event = _event
    }

    public handle(_event: ethereum.Event, version: Version): void {
        this._handle(_event, version)
    }

    private _handle(_event: ethereum.Event, version: Version): void {
        if (this.user == zero_address) return

        const quote = Quote.load(this.event.params.quoteId.toString())
        if (quote == null) return
        quote.quantity = this.event.params.filledAmount
        quote.openedPrice = this.event.params.openedPrice
        quote.quoteStatus = QuoteStatus.OPENED
        quote.lastUpdate = this.event.block.timestamp
        quote.openDay = this.day
        quote.save()

        let platformFee = this.getTradingFee(quote.symbolId)
        const volumeInDollars = this.getTradeVolume()

        updateDailyHistory(this.user, this.account, this.day, volumeInDollars, platformFee, this.timestamp) // user volume tracker
    }

    public getTradeVolume(): BigInt {
        return this.event.params.filledAmount.times(this.event.params.openedPrice).div(BigInt.fromString("10").pow(18))
    }

    public getTradingFee(symbolId: BigInt): BigInt {
        const symbol = Symbol.load(symbolId.toString())
        if (symbol == null) return BigInt.zero() // FIXME: should not happen !
        return this.event.params.filledAmount.times(this.event.params.openedPrice).times(symbol.tradingFee).div(BigInt.fromString("10").pow(36))
    }
}
