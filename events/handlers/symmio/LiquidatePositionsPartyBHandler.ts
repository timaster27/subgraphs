import { LiquidatePositionsPartyB as LiquidatePositionsPartyBEntity } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { LiquidatePositionsPartyB as LiquidatePositionsPartyB_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { LiquidatePositionsPartyB as LiquidatePositionsPartyB_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"

export class LiquidatePositionsPartyBHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new LiquidatePositionsPartyBEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.liquidator = event.params.liquidator
		entity.partyB = event.params.partyB
		entity.partyA = event.params.partyA
		entity.quoteIds = event.params.quoteIds

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<LiquidatePositionsPartyB_8_4>(_event)
				entity.liquidatedAmounts = e.params.liquidatedAmounts
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<LiquidatePositionsPartyB_8_3>(_event)
				entity.liquidatedAmounts = e.params.liquidatedAmounts
				break
			}
			default: {
				entity.liquidatedAmounts = []
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
