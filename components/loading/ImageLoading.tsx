import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'

type TBackdrop = {
    open: boolean
}
export default function ImageLoading(prop: TBackdrop) {
    const { open } = prop

    return (
        <Box>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                }}
                open={open}
            >
                <div className="loadingio-spinner-eclipse-ze6vh6ku93">
                    <div className="ldio-34ii9kpimtq">
                        <div></div>
                    </div>
                </div>
            </Backdrop>
        </Box>
    )
}
