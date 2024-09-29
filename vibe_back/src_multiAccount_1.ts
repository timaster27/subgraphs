import {AddAccountHandler} from './handlers/multiAccount/AddAccountHandler'
import {AddAccount} from '../generated/multiAccount_1/multiAccount_1'
import {EditAccountNameHandler} from './handlers/multiAccount/EditAccountNameHandler'
import {EditAccountName} from '../generated/multiAccount_1/multiAccount_1'
import {MultiAccountVersion} from '../common/BaseHandler'


export function handleAddAccount(event: AddAccount): void {
    let handler = new AddAccountHandler<AddAccount>()
    handler.handle(event, MultiAccountVersion.v_1)
}


export function handleEditAccountName(event: EditAccountName): void {
    let handler = new EditAccountNameHandler<EditAccountName>()
    handler.handle(event, MultiAccountVersion.v_1)
}
