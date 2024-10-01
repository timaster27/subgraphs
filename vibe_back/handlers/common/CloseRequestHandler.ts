import {Address, BigInt, ethereum} from "@graphprotocol/graph-ts"
import {updateDailyHistory, zero_address} from "../../utils"
import {Quote} from "../../../generated/schema"
import {Handler} from "./Handler"
import {QuoteStatus} from "../../config"
import {Version} from "../../../common/BaseHandler";
import {FillCloseRequest} from "../../../generated/symmio_0_8_2/symmio_0_8_2";

export class CloseRequestHandler<T> extends Handler<T> {
    event: FillCloseRequest
    user: Address
    account: Address

    constructor(_event: ethereum.Event) {
        super(_event)
        // @ts-ignore
        const event = changetype<FillCloseRequest>(_event) // FillClose, ForceClose, EmergencyClose all have the same event signature
        this.user = super.getOwner(event.params.partyA)
        this.account = event.params.partyA
        this.event = event
    }

    public handle(_event: ethereum.Event, version: Version): void {
        this._handle(_event, version)
    }

    private _handle(_event: ethereum.Event, version: Version): void {
        if (this.user == zero_address) return
        const quote = Quote.load(this.event.params.quoteId.toString())
        if (quote == null) return

        const tradeVolume = this.getVolume()
        updateDailyHistory(this.user, this.account, this.day, tradeVolume, BigInt.zero(), this.timestamp) // user volume tracker

        quote.avgClosedPrice = quote.avgClosedPrice
            .times(quote.closedAmount)
            .plus(this.event.params.filledAmount.times(this.event.params.closedPrice))
            .div(quote.closedAmount.plus(this.event.params.filledAmount))
        quote.closedAmount = quote.closedAmount.plus(this.event.params.filledAmount)
        if (quote.closedAmount == quote.quantity) {
            quote.quoteStatus = QuoteStatus.CLOSED
            quote.closeDay = this.day
        }
        quote.lastUpdate = this.event.block.timestamp

        quote.save()
    }

    public getVolume(): BigInt {
        return this.event.params.filledAmount.times(this.event.params.closedPrice).div(BigInt.fromString("10").pow(18))
    }
}
