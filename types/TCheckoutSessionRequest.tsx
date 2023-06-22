export type TShoppingSession = {
    id: number
    userId: number
    total: number
    voucher: string | null
    voucherType: string | null
    discount: number
    checkedout: boolean
    expired: Date
    createdDate: Date | null
}
