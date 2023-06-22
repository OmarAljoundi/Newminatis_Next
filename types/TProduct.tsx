import { TProductCategory } from './TProductCategory'
import { TProductImages } from './TProductImages'
import { TProductInventory } from './TProductInventory'
import { TProductReview } from './TProductReview'
import { TProductSizeGuide } from './TProductSizeGuide'

export type TProduct = {
    id: number
    name: string
    color: number
    status: number
    description: string
    sku: string
    categoryId: number | null
    price: number
    salePrice: number | null
    discountId: number
    createdDate: Date | null
    ModifiedDate: Date | null
    isBestSeller: number
    sizes: string
    tags: string
    shortDescription: string
    friendlyName: string
    subSku: string
    productCategory: TProductCategory | null
    productInventory: TProductInventory[] | null
    files: File[] | null
    images: string[] | null
    mainImage: string | null
    Instock?: boolean
    type: string
    productImages: TProductImages[] | null
    productReview?: TProductReview[] | null
    productSizeGuide: TProductSizeGuide[]
    relatedProducts?: string | null
}
