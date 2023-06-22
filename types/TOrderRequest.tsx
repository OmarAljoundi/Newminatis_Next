export type TOrderRequest = {
    userAddressId: number
    items: Items[]
    total: number
    subTotal: number
    sessionId: number
    currency: string
    rate: number
}

export type Items = {
    productId: number
    image: string
    sku: string
    quantity: number
    price: number
    productName: string
}
