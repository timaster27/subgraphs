import { RoleGrantedHandler as CommonRoleGrantedHandler } from "../../common/handlers/RoleGrantedHandlerMultiAccount"
import { GrantedRole } from "../../generated/schema"
import { RoleGranted } from "../../generated/symmioMultiAccount_0/symmioMultiAccount"
import { rolesNamesMultiAccount } from "../utils"

export class RoleGrantedHandler extends CommonRoleGrantedHandler {
	constructor(event: RoleGranted) {
		super(event)
	}

	handle(): void {
		super.handle()
		const globalCounter = super.handleGlobalCounter()
		super.handleQuote()
		super.handleSymbol()
		super.handleUser()
		super.handleAccount()

		let event = super.getEvent()

		let id =
			rolesNamesMultiAccount.get(event.params.role.toHexString()) +
			"_" +
			event.params.account.toHexString() +
			"_" +
			event.address.toHexString()
		let gr = new GrantedRole(id)
		gr.role = rolesNamesMultiAccount.get(event.params.role.toHexString()) || event.params.role.toHexString()
		gr.user = event.params.account
		gr.contract = event.address
		gr.grantTransaction = event.transaction.hash
		gr.revokeTransaction = null
		gr.updateTimestamp = event.block.timestamp
		gr.save()
	}
}
