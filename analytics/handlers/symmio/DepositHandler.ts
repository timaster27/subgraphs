import { DepositHandler as CommonDepositHandler } from "../../../common/handlers/symmio/DepositHandler"
import { Account, BalanceChange } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts";
import { Version } from "../../../common/BaseHandler";
import { getConfiguration, newUserAndAccount } from "../../utils/builders";

import { updateActivityTimestamps, updateHistories, UpdateHistoriesParams } from "../../utils/helpers";

export class DepositHandler<T> extends CommonDepositHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		super.handleQuote(_event, version)
		super.handleSymbol(_event, version)
		super.handleAccount(_event, version)
		newUserAndAccount(event.params.user, event.block, event.transaction)

		let account = Account.load(event.params.user.toHexString())!
		updateActivityTimestamps(account, event.block.timestamp)
		let deposit = new BalanceChange(
			event.transaction.hash.toHex() + "-" + event.logIndex.toHexString(),
		)
		deposit.type = "DEPOSIT"
		deposit.timestamp = event.block.timestamp
		deposit.blockNumber = event.block.number
		deposit.transaction = event.transaction.hash
		deposit.amount = event.params.amount
		deposit.account = event.params.user
		deposit.collateral = getConfiguration(event).collateral
		deposit.save()

		updateHistories(
			new UpdateHistoriesParams(account, event.block.timestamp)
				.deposit(deposit.amount)
		)
	}
}