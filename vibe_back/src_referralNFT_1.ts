import {SetReferrerHandler} from './handlers/referralNFT/SetReferrerHandler'
import {SetReferrer} from '../generated/referralNFT_1/referralNFT_1'
import {TransferHandler} from './handlers/referralNFT/TransferHandler'
import {Transfer} from '../generated/referralNFT_1/referralNFT_1'
import {VibeVersion} from '../common/BaseHandler'


export function handleSetReferrer(event: SetReferrer): void {
    let handler = new SetReferrerHandler<SetReferrer>()
    handler.handle(event, VibeVersion.v_1)
}


export function handleTransfer(event: Transfer): void {
    let handler = new TransferHandler<Transfer>()
    handler.handle(event, VibeVersion.v_1)
}
