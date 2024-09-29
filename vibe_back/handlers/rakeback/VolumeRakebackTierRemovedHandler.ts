import {ethereum} from "@graphprotocol/graph-ts";
import {VibeVersion} from "../../../common/BaseHandler";
import {VolumeRakebackTier} from "../../../generated/schema";

export class VolumeRakebackTierRemovedHandler<T> {
    handle(_event: ethereum.Event, version: VibeVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        let entity = VolumeRakebackTier.load(event.params.index.toString())!
        entity.removedTimestamp = event.block.timestamp
        entity.id = event.params.index.toString() + "_" + event.block.timestamp.toString()
        entity.save()

        let entityOld = VolumeRakebackTier.load(event.params.index.toString())!
        entityOld.addedTimestamp = null
        entityOld.rakebackRatio = null
        entityOld.maxVolume = null
        entityOld.removedTimestamp = null
        entityOld.save()
    }
}
