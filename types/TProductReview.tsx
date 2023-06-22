import { TUser } from './TUser'

export type TProductReview = {
    id?: number
    userId?: number
    productId?: number
    review?: string
    status?: number
    stars?: number
    helpful?: number
    notHelpful?: number
    createdDate?: Date | null
    email?: string
    user?: TUser | null
}

export enum eReviewStatus {
    WaitingForApproval = 0,
    Approved = 1,
    Rejected = 2,
}

export type Crypt = {
    key: string
}
