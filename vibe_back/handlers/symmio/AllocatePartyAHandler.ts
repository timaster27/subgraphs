import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {
    AllocatePartyAHandler as CommonAllocatePartyAHandler
} from "../../../common/handlers/symmio/AllocatePartyAHandler";

export class AllocatePartyAHandler<T> extends CommonAllocatePartyAHandler<T> {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}

