import {ethereum} from "@graphprotocol/graph-ts";
import {VibeVersion} from "../../../common/BaseHandler";
import {NFT} from "../../../generated/schema";
import {getAccountOwner} from "../../utils";

export class SetReferrerHandler<T> {
    handle(_event: ethereum.Event, version: VibeVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        let entity = NFT.load(event.params.tokenId.toString())!
        entity.referrerId = event.params.referrerTokenId
        entity.lastUpdate = event.block.timestamp
        entity.accountOwner = getAccountOwner(event.params.tokenId)
        entity.save()
    }
}

