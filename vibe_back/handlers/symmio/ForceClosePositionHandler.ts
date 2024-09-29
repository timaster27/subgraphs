import {ethereum} from "@graphprotocol/graph-ts"
import {CloseRequestHandler as CommonCloseRequestHandler} from "../common/CloseRequestHandler";
import {Version} from "../../../common/BaseHandler";

export class ForceClosePositionHandler extends CommonCloseRequestHandler {
    handle(_event: ethereum.Event, version: Version): void {
        super.handle(_event, version)
    }
}
