import {ethereum} from "@graphprotocol/graph-ts";
import {MultiAccountVersion} from "../../../common/BaseHandler";
import {
    AddAccountHandler as CommonAddAccountHandler
} from "../../../common/handlers/symmioMultiAccount/AddAccountHandler";

export class AddAccountHandler<T> extends CommonAddAccountHandler<T> {
    handle(_event: ethereum.Event, version: MultiAccountVersion): void {
        super.handle(_event, version)
    }
}
