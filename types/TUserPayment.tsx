export type TUserPayment = {
    userId: number
    paymentType: string
    accountNo: string
    expiry: string
}

export type TPaymentMethodModel = {
    id: string
    type: number
    card: TPaymentMethodCardModel
}

export type TPaymentMethodCardModel = {
    brand: string
    country: string
    description: string
    expMonth: number
    expYear: number
    fingerprint: string
    funding: string
    iin: string
    issuer: string
    last4: string
}
