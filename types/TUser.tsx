import { TUserAddress } from './TUserAddress'
import { TPaymentMethodModel, TUserPayment } from './TUserPayment'

export type TUser = {
    id?: number | null
    email: string
    password?: string | null
    type?: RegisterType | null
    role?: Role | null
    createdDate?: Date | null
    modifiedDate?: Date | null
    userAddress?: TUserAddress[] | null
    userPayment?: TPaymentMethodModel[] | null
    selectedAddress?: number | null
}

export type TUserStripePayment = {
    id?: number | null
    email: string
    username?: string
}

export type TAttachPaymentRequest = {
    email: string
    id: string
}

export enum RegisterType {
    Facebook = 0,
    Google = 1,
    Self = 2,
}

export enum Role {
    Admin = 1,
    User = 2,
    Guest = 3,
}
