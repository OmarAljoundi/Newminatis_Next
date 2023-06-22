import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'

type TBackdrop = {
    open: boolean
}
export default function BackdropLoading(prop: TBackdrop) {
    const { open } = prop

    return (
        <Box>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}
