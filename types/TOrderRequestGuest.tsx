import { Items } from './TOrderRequest'
import { TUserGuest } from './TUserGuest'

export type TOrderRequestGuest = {
    guest: TUserGuest
    items: Items[]
    sessionId: number
    subTotal: number
    total: number
    currency: string
    rate: number
}
