import { BaseHandler } from "../BaseHandler"
import { SetSymbolsPrices } from "../../generated/symmio/symmio"

export class SetSymbolsPricesHandler extends BaseHandler {
	protected event: SetSymbolsPrices

	constructor(event: SetSymbolsPrices) {
		super(event)
		this.event = event
	}

	protected getEvent(): SetSymbolsPrices {
		return this.event
	}

	handle(): void {
	}

	handleQuote(): void {
		// TODO
	}
}