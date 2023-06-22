import { useState } from 'react'

// ================================================================
type Order = 'asc' | 'desc'
type Unknown = Record<string | number, string>
// ================================================================

export function descendingComparator(a: Unknown, b: Unknown, orderBy: string) {
    if (b[orderBy] < a[orderBy]) return -1
    if (b[orderBy] > a[orderBy]) return 1
    return 0
}

export function getComparator(order: Order, orderBy: string) {
    return order === 'desc'
        ? (a: Unknown, b: Unknown) => descendingComparator(a, b, orderBy)
        : (a: Unknown, b: Unknown) => -descendingComparator(a, b, orderBy)
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })

    return stabilizedThis.map((el) => el[0])
}

// ================================================================
interface HookProps {
    listData: any[]
    defaultSort?: string
    defaultOrder?: 'asc' | 'desc'
}
// ================================================================

const useMuiTable = (props: HookProps) => {
    const { listData = [], defaultSort = 'name', defaultOrder = 'asc' } = props

    const [page, setPage] = useState(0)
    const [rowsPerPage] = useState(4)
    const [orderBy, setOrderBy] = useState(defaultSort)
    const [selected, setSelected] = useState<string[]>([])
    const [order, setOrder] = useState<Order>(defaultOrder)

    // Handle list sorting
    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    // Handle select whole list
    const handleSelectAllClick = (checked: boolean, defaultSelect: string) => {
        if (checked) {
            const newSelecteds = listData.map((n: any) => n[defaultSelect])
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    // Handle individual row click
    const handleRowClick = (name: string) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected: string[] = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }
        setSelected(newSelected)
    }

    const handleChangePage = (_, newPage: number) => setPage(newPage - 1)

    const filteredList = stableSort(
        listData,
        getComparator(order, orderBy)
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return {
        page,
        order,
        orderBy,
        selected,
        rowsPerPage,
        filteredList,

        handleRowClick,
        handleChangePage,
        handleRequestSort,
        handleSelectAllClick,
    }
}

export default useMuiTable
