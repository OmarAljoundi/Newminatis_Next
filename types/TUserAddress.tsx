export type TUserAddress = {
    id: number
    userId: number
    email?: string
    firstName: string
    lastName: string
    phoneNumber: string
    addressLine: string
    deliveryInstructions: string
    country: string
    active: boolean
    postalCode: string
    state?: string
    city: string
    createdDate: Date | null
    modifiedDate: Date | null
}
