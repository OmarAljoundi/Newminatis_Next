import { FC, ReactNode } from 'react'
import { Box, Drawer, styled } from '@mui/material'

// ==========================================================
type LayoutDrawerProps = {
    open: boolean
    children: ReactNode
    onClose: () => void
    drawerWidth?: number
}
// ==========================================================

const Wrapper = styled(Box)(({ theme }) => ({
    height: '100%',
    width: 'inherit',
    position: 'absolute',
    overflow: 'hidden',
    boxShadow: theme.shadows[1],
    zIndex: theme.zIndex.drawer + 3,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[900],
}))

const LayoutDrawer: FC<LayoutDrawerProps> = (props) => {
    const { children, open, onClose, drawerWidth = 280 } = props

    return (
        <Drawer
            open={open}
            anchor="left"
            onClose={onClose}
            PaperProps={{ sx: { width: drawerWidth } }}
        >
            <Wrapper>{children}</Wrapper>
        </Drawer>
    )
}

export default LayoutDrawer
