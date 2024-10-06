import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {DepositHandler as CommonDepositHandler} from "../../../common/handlers/symmio/DepositHandler";

export class DepositHandler<T> extends CommonDepositHandler<T> {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}

