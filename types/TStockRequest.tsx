export type TStockRequest = {
    sku: string
    inventory_type: 'domestic'
}

type Inventory = {
    sku: string
    quantity: string
}

type Status = {
    comment: string
    response: boolean
}

export interface IStockResponse {
    inventory: Inventory
    status: Status
}
