import { Tooltip, TooltipProps, styled } from '@mui/material'

export const TooltipError: React.FC<TooltipProps> = ({ ...props }) => (
    <Tooltip
        {...props}
        componentsProps={{
            tooltip: {
                sx: {
                    color: 'white',
                    backgroundColor: '#E53935',
                    '& .MuiTooltip-arrow': {
                        color: '#E53935',
                    },
                },
            },
        }}
    />
)

export const TooltipInfo: React.FC<TooltipProps> = ({ ...props }) => (
    <Tooltip
        {...props}
        componentsProps={{
            tooltip: {
                sx: {
                    color: 'white',
                    backgroundColor: '#1C1C1C',
                    '& .MuiTooltip-arrow': {
                        color: '#1C1C1C',
                    },
                },
            },
        }}
    />
)

export const TooltipStock: React.FC<TooltipProps> = ({ ...props }) => (
    <Tooltip
        {...props}
        componentsProps={{
            tooltip: {
                sx: {
                    color: '#E53935',
                    backgroundColor: 'transparent',
                    '& .MuiTooltip-arrow': {
                        color: '#E53935',
                    },
                },
            },
        }}
    />
)
