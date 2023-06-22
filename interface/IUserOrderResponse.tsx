import { IBaseResponse } from './IBaseResponse'

export interface IUserOrderResponse extends IBaseResponse {
    allOrders: number
    cancelledOrders: number
    delieverdOrders: number
}
