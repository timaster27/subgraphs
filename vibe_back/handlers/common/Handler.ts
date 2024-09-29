import {Address, BigInt, ethereum} from "@graphprotocol/graph-ts"
import {Account} from "../../../generated/schema"
import {Version} from "../../../common/BaseHandler";

export class Handler {
    private _event: ethereum.Event
    timestamp: BigInt
    day: BigInt

    constructor(event: ethereum.Event) {
        const timestamp = event.block.timestamp
        this.timestamp = timestamp
        this._event = event
        this.day = timestamp.div(BigInt.fromI32(86400))
    }

    public handle(_event: ethereum.Event, version: Version): void {
    }

    public getOwner(account: Address): Address {
        let acc = Account.load(account.toHexString())
        if (!acc) return Address.zero()
        return Address.fromBytes(acc.user)
    }
}
