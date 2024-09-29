import {ethereum} from "@graphprotocol/graph-ts";
import {VibeVersion} from "../../../common/BaseHandler";
import {VolumeRakebackTier} from "../../../generated/schema";

export class VolumeRakebackTierAddedHandler<T> {
    handle(_event: ethereum.Event, version: VibeVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        let entity = new VolumeRakebackTier(event.params.index.toString())
        entity.addedTimestamp = event.block.timestamp
        entity.maxVolume = event.params.maxVolume
        entity.rakebackRatio = event.params.rakebackRatio
        entity.save()
    }
}
