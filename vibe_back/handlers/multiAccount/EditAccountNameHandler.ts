import {ethereum} from "@graphprotocol/graph-ts";
import {MultiAccountVersion} from "../../../common/BaseHandler";
import {
    EditAccountNameHandler as CommonEditAccountNameHandler
} from "../../../common/handlers/symmioMultiAccount/EditAccountNameHandler";

export class EditAccountNameHandler<T> extends CommonEditAccountNameHandler<T> {
    handle(_event: ethereum.Event, version: MultiAccountVersion): void {
        super.handle(_event, version)
    }
}
