import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {
    DeallocatePartyAHandler as CommonDeallocatePartyAHandler
} from "../../../common/handlers/symmio/DeallocatePartyAHandler";

export class DeallocatePartyAHandler<T> extends CommonDeallocatePartyAHandler<T> {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}

