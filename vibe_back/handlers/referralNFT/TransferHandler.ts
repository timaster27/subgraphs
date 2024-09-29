import {ethereum} from "@graphprotocol/graph-ts";
import {VibeVersion} from "../../../common/BaseHandler";
import {NFT} from "../../../generated/schema";
import {getAccountOwner} from "../../utils";

export class TransferHandler<T> {
    handle(_event: ethereum.Event, version: VibeVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        let entity = NFT.load(event.params.tokenId.toString())
        if (!entity) {
            entity = new NFT(event.params.tokenId.toString())
            entity.blockNumber = event.block.number
            entity.blockTimestamp = event.block.timestamp
        }
        entity.lastUpdate = event.block.timestamp
        entity.owner = event.params.to
        entity.accountOwner = getAccountOwner(event.params.tokenId)
        entity.save()
    }
}
