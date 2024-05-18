import { FillCloseRequestHandler as CommonFillCloseRequestHandler } from "../../common/handlers/FillCloseRequestHandler"
import { FillCloseRequest } from "../../generated/symmio/symmio"

export class FillCloseRequestHandler extends CommonFillCloseRequestHandler {

	constructor(event: FillCloseRequest) {
		super(event)
	}

	handle(): void {
		super.handle()
		super.handleGlobalCounter()
		super.handleQuote()
		super.handleSymbol()
		super.handleUser()
		super.handleAccount()
	}
}
