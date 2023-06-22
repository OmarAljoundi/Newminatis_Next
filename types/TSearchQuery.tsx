export type SearchQuery = {
    FilterByOptions: FilterByOptions[]
    OrderByOptions: OrderByOptions[]
    PageSize: number
    PageIndex: number
}

export type FilterByOptions = {
    MemberName: string
    FilterOperator: eFilterOperator
    FilterFor: any
}

export type OrderByOptions = {
    MemberName: string
    SortOrder: Order
}

export enum Order {
    ASC = 1,
    DESC = 2,
}

export enum eFilterOperator {
    Equal = 1,
    NotEqual = 2,
    GreaterThan = 3,
    LessThan = 4,
    GreaterThanOrEqual = 5,
    LessThanOrEqual = 6,
    EqualToList = 7,
    Contains = 8,
}
