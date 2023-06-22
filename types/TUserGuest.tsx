export type TUserGuest = {
    id: number
    email: string
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    addressLine: string | null
    deliveryInstructions: string
    country: string | null
    postalCode: number | null
    state: string | null
    city: string | null
    createdDate: string | null
    modifiedDate: string | null
    newsletter: boolean | null
}
