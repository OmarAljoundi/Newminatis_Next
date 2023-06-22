export type TOrderDto = {
    id: number
    depoterOrderId: string | null
    edd: Date
    amount: number
    purchaseDate: Date
    quantity: number
    shippingAddress: string
    status: eOrderStatus
    userEmail: string
}

export enum eOrderStatus {
    Processing = 0,
    UnderDelievery = 1,
    Delieverd = 2,

    Canceled = 3,
}

export type TOrderItemsDto = {
    orderId: number
    shippingAddress: string
    createdDate: Date | null
    edd: Date | null
    status: eOrderStatus
    total: number
    items: Items[]
}

export type Items = {
    id: number
    pricePerOne: number
    size: string
    quantity: number
    sku: string
    productName: string
    productImage: string
    color: number
}
