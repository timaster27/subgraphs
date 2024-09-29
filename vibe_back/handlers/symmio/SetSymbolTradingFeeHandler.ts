import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {Symbol} from "../../../generated/schema"
import {SetSymbolTradingFee} from "../../../generated/symmio_0_8_2/symmio_0_8_2";

export class SetSymbolTradingFeeHandler {
    constructor(event: SetSymbolTradingFee) {}

    handle(_event: ethereum.Event, version: Version): void {
        // @ts-ignore
        const event = changetype(_event)
        let symbol = Symbol.load(event.params.symbolId.toString())!
        symbol.tradingFee = event.params.tradingFee
        symbol.updateTimestamp = event.block.timestamp
        symbol.save()
    }
}
