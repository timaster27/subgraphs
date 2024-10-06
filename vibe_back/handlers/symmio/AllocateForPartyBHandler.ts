import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {
    AllocateForPartyBHandler as CommonAllocateForPartyBHandler
} from "../../../common/handlers/symmio/AllocateForPartyBHandler";

export class AllocateForPartyBHandler<T> extends CommonAllocateForPartyBHandler<T> {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}

