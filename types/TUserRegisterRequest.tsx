import { RegisterType, Role } from './TUser'

export type TUserRegisterRequest = {
    email: string
    password: string
    re_password: string
    agreement: boolean
    role: Role
    type: RegisterType
}
