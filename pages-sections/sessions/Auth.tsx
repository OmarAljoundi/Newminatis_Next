import { Dialog } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import Login from './Login'
import ResetPasswordStepper from './ResetPasswordStepper'
import Signup from './Signup'

type Prop = {
    dialogOpen: boolean
    isMobile: boolean
    toggleDialog: () => void
    defaultTap?: 'LOGIN' | 'REGISTER' | 'RESET'
}
export const Auth: FC<Prop> = ({
    dialogOpen,
    isMobile,
    toggleDialog,
    defaultTap,
}) => {
    const [type, setType] = useState(defaultTap ?? 'LOGIN')

    const handleSetType = (_type: 'LOGIN' | 'REGISTER' | 'RESET') => {
        setType(_type)
    }

    return (
        <Dialog
            scroll="body"
            open={dialogOpen}
            fullWidth={isMobile}
            onClose={toggleDialog}
        >
            {type == 'LOGIN' && (
                <Login onClose={toggleDialog} handleSetType={handleSetType} />
            )}
            {type == 'REGISTER' && (
                <Signup onClose={toggleDialog} handleSetType={handleSetType} />
            )}
            {type == 'RESET' && (
                <ResetPasswordStepper
                    onClose={toggleDialog}
                    handleSetType={handleSetType}
                />
            )}
        </Dialog>
    )
}
