import {ethereum} from "@graphprotocol/graph-ts"
import {LiquidatePositionsHandler as CommonLiquidatePositionsHandler} from "../common/LiquidatePositionsHandler";
import {Version, VibeVersion} from "../../../common/BaseHandler";

export class LiquidatePositionsPartyBHandler<T> extends CommonLiquidatePositionsHandler<T> {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}

