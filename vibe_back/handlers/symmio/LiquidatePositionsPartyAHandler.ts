import {ethereum} from "@graphprotocol/graph-ts"
import {LiquidatePositionsHandler as CommonLiquidatePositionsHandler} from "../common/LiquidatePositionsHandler";
import {Version} from "../../../common/BaseHandler";

export class LiquidatePositionsPartyAHandler<T> extends CommonLiquidatePositionsHandler<T> {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}

