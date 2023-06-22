export type TCheckoutRequest = {
    id: number
    email: string
    amount: number
}

export type TCheckoutSavedCardRequest = {
    email: string
    amount: number
    paymentId: string
}
