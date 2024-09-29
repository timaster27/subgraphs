import {ethereum} from "@graphprotocol/graph-ts"
import {Symbol} from "../../../generated/schema"
import {Version} from "../../../common/BaseHandler";
import {AddSymbol} from "../../../generated/symmio_0_8_2/symmio_0_8_2";

export class AddSymbolHandler {
    constructor(event: AddSymbol) {}

    handle(_event: ethereum.Event, version: Version): void {
        // @ts-ignore
        const event = changetype(_event)
        let symbol = new Symbol(event.params.id.toString())
        symbol.name = event.params.name
        symbol.tradingFee = event.params.tradingFee
        symbol.timestamp = event.block.timestamp
        symbol.updateTimestamp = event.block.timestamp
        symbol.blockNumber = event.block.number
        symbol.save()
    }
}

