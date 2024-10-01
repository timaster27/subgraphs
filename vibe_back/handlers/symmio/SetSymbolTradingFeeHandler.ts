import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {
    SetSymbolTradingFeeHandler as CommonSetSymbolTradingFeeHandler
} from "../../../common/handlers/symmio/SetSymbolTradingFeeHandler";

export class SetSymbolTradingFeeHandler<T> extends CommonSetSymbolTradingFeeHandler<T> {

    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}
