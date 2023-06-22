import { TProductVariant } from './TProductVariant'

export type TProductInventory = {
    id: number
    sku: string | null
    productId: number
    label: string
    shortName: string
    values: string[]
    valueVsQuantity?: ValueVsQuantity[] | null
}

export type ValueVsQuantity = {
    variable: string
    quantity: number
}
