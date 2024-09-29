import {ethereum} from "@graphprotocol/graph-ts";
import {VibeVersion} from "../../../common/BaseHandler";
import {VolumeRakebackTier} from "../../../generated/schema";

export class VolumeRakebackTierUpdatedHandler<T> {
    handle(_event: ethereum.Event, version: VibeVersion): void {
        // @ts-ignore
        const event = changetype<T>(_event)
        let entity = VolumeRakebackTier.load(event.params.index.toString())!
        entity.removedTimestamp = event.block.timestamp
        entity.id = event.params.index.toString() + "_" + event.block.timestamp.toString()
        entity.save()

        let newEntity = VolumeRakebackTier.load(event.params.index.toString())!
        newEntity.addedTimestamp = event.block.timestamp
        newEntity.maxVolume = event.params.maxVolume
        newEntity.rakebackRatio = event.params.rakebackRatio
        newEntity.save()
    }
}
