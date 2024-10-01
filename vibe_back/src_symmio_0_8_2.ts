import {
    AddSymbol,
    EmergencyClosePosition,
    FillCloseRequest,
    ForceClosePosition,
    LiquidatePositionsPartyA,
    LiquidatePositionsPartyB,
    OpenPosition,
    SendQuote,
    SetSymbolTradingFee
} from '../generated/symmio_0_8_2/symmio_0_8_2'
import {EmergencyClosePositionHandler} from './handlers/symmio/EmergencyClosePositionHandler'
import {FillCloseRequestHandler} from './handlers/symmio/FillCloseRequestHandler'
import {ForceClosePositionHandler} from './handlers/symmio/ForceClosePositionHandler'
import {LiquidatePositionsPartyAHandler} from './handlers/symmio/LiquidatePositionsPartyAHandler'
import {LiquidatePositionsPartyBHandler} from './handlers/symmio/LiquidatePositionsPartyBHandler'
import {OpenPositionHandler} from './handlers/symmio/OpenPositionHandler'
import {Version} from '../common/BaseHandler'
import {AddSymbolHandler} from "./handlers/symmio/AddSymbolHandler";
import {SendQuoteHandler} from "./handlers/symmio/SendQuoteHandler";
import {SetSymbolTradingFeeHandler} from "./handlers/symmio/SetSymbolTradingFeeHandler";


export function handleAddSymbol(event: AddSymbol): void {
    let handler = new AddSymbolHandler<AddSymbol>()
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


export function handleSendQuote(event: SendQuote): void {
    let handler = new SendQuoteHandler<SendQuote>()
    handler.handle(event, Version.v_0_8_2)
}


export function handleSetSymbolTradingFee(event: SetSymbolTradingFee): void {
    let handler = new SetSymbolTradingFeeHandler<SetSymbolTradingFee>()
    handler.handle(event, Version.v_0_8_2)
}
