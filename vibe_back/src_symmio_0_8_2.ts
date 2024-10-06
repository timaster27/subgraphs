import {AddSymbolHandler} from './handlers/symmio/AddSymbolHandler'
import {
    AddSymbol,
    AllocateForPartyB,
    AllocatePartyA,
    DeallocateForPartyB,
    DeallocatePartyA,
    Deposit,
    EmergencyClosePosition,
    FillCloseRequest,
    ForceClosePosition,
    LiquidatePositionsPartyA,
    LiquidatePositionsPartyB,
    OpenPosition,
    RequestToClosePosition,
    SendQuote,
    SetSymbolTradingFee,
    Withdraw
} from '../generated/symmio_0_8_2/symmio_0_8_2'
import {AllocateForPartyBHandler} from './handlers/symmio/AllocateForPartyBHandler'
import {AllocatePartyAHandler} from './handlers/symmio/AllocatePartyAHandler'
import {DeallocateForPartyBHandler} from './handlers/symmio/DeallocateForPartyBHandler'
import {DeallocatePartyAHandler} from './handlers/symmio/DeallocatePartyAHandler'
import {DepositHandler} from './handlers/symmio/DepositHandler'
import {EmergencyClosePositionHandler} from './handlers/symmio/EmergencyClosePositionHandler'
import {FillCloseRequestHandler} from './handlers/symmio/FillCloseRequestHandler'
import {ForceClosePositionHandler} from './handlers/symmio/ForceClosePositionHandler'
import {LiquidatePositionsPartyAHandler} from './handlers/symmio/LiquidatePositionsPartyAHandler'
import {LiquidatePositionsPartyBHandler} from './handlers/symmio/LiquidatePositionsPartyBHandler'
import {OpenPositionHandler} from './handlers/symmio/OpenPositionHandler'
import {RequestToClosePositionHandler} from './handlers/symmio/RequestToClosePositionHandler'
import {SendQuoteHandler} from './handlers/symmio/SendQuoteHandler'
import {SetSymbolTradingFeeHandler} from './handlers/symmio/SetSymbolTradingFeeHandler'
import {Version} from '../common/BaseHandler'
import {WithdrawHandler} from './handlers/symmio/WithdrawHandler'


export function handleAddSymbol(event: AddSymbol): void {
    let handler = new AddSymbolHandler<AddSymbol>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleAllocateForPartyB(event: AllocateForPartyB): void {
    let handler = new AllocateForPartyBHandler<AllocateForPartyB>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleAllocatePartyA(event: AllocatePartyA): void {
    let handler = new AllocatePartyAHandler<AllocatePartyA>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleDeallocateForPartyB(event: DeallocateForPartyB): void {
    let handler = new DeallocateForPartyBHandler<DeallocateForPartyB>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleDeallocatePartyA(event: DeallocatePartyA): void {
    let handler = new DeallocatePartyAHandler<DeallocatePartyA>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleDeposit(event: Deposit): void {
    let handler = new DepositHandler<Deposit>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleEmergencyClosePosition(event: EmergencyClosePosition): void {
    let handler = new EmergencyClosePositionHandler<EmergencyClosePosition>(event)
    handler.handle(event, Version.v_0_8_2)
}


export function handleFillCloseRequest(event: FillCloseRequest): void {
    let handler = new FillCloseRequestHandler<FillCloseRequest>(event)
    handler.handle(event, Version.v_0_8_2)
}


export function handleForceClosePosition(event: ForceClosePosition): void {
    let handler = new ForceClosePositionHandler<ForceClosePosition>(event)
    handler.handle(event, Version.v_0_8_2)
}


export function handleLiquidatePositionsPartyA(event: LiquidatePositionsPartyA): void {
    let handler = new LiquidatePositionsPartyAHandler<LiquidatePositionsPartyA>(event)
    handler.handle(event, Version.v_0_8_2)
}


export function handleLiquidatePositionsPartyB(event: LiquidatePositionsPartyB): void {
    let handler = new LiquidatePositionsPartyBHandler<LiquidatePositionsPartyB>(event)
    handler.handle(event, Version.v_0_8_2)
}


export function handleOpenPosition(event: OpenPosition): void {
    let handler = new OpenPositionHandler<OpenPosition>(event)
    handler.handle(event, Version.v_0_8_2)
}


export function handleRequestToClosePosition(event: RequestToClosePosition): void {
    let handler = new RequestToClosePositionHandler<RequestToClosePosition>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleSendQuote(event: SendQuote): void {
    let handler = new SendQuoteHandler<SendQuote>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleSetSymbolTradingFee(event: SetSymbolTradingFee): void {
    let handler = new SetSymbolTradingFeeHandler<SetSymbolTradingFee>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleWithdraw(event: Withdraw): void {
    let handler = new WithdrawHandler<Withdraw>()
    handler.handle(event, Version.v_0_8_2)
}
