import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {
    DeallocateForPartyBHandler as CommonDeallocateForPartyBHandler
} from "../../../common/handlers/symmio/DeallocateForPartyBHandler";

export class DeallocateForPartyBHandler<T> extends CommonDeallocateForPartyBHandler<T> {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}

