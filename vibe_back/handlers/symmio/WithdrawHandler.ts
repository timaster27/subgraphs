import {ethereum} from "@graphprotocol/graph-ts"
import {Version} from "../../../common/BaseHandler";
import {
    WithdrawHandler as CommonWithdrawHandler
} from "../../../common/handlers/symmio/WithdrawHandler";

export class WithdrawHandler<T> extends CommonWithdrawHandler<T> {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}

