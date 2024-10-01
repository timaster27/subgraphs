import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {QuoteStatus} from "../../config";
import {Account, Quote} from "../../../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts"
import {SendQuote} from "../../../generated/symmio_0_8_2/symmio_0_8_2";

export class SendQuoteHandler<T> {
    constructor() {}

    handle(_event: ethereum.Event, version: Version): void {
        // @ts-ignore
        const event = changetype<SendQuote>(_event)
        let account = Account.load(event.params.partyA.toHexString())
        if (!account) return

        const quote = new Quote(event.params.quoteId.toString())
        quote.transaction = event.transaction.hash
        quote.quantity = event.params.quantity
        quote.symbolId = event.params.symbolId
        quote.account = event.params.partyA
        quote.positionType = event.params.positionType
        quote.closedAmount = BigInt.fromString("0")
        quote.avgClosedPrice = BigInt.fromString("0")
        quote.quoteStatus = QuoteStatus.PENDING
        quote.timestamp = event.block.timestamp
        quote.lastUpdate = event.block.timestamp
        quote.save()
    }
}
