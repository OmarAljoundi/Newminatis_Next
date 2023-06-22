import { Fab, Toolbar, Zoom, useTheme } from '@mui/material'
import { green } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
export default function ScrollToTopIcon() {
    const [isVisible, setIsVisible] = useState(false)
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 3000) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const transitionDuration = {
        enter: 200,
        exit: 300,
    }
    const fabGreenStyle = {
        color: 'common.white',
        position: 'fixed',
        bottom: '80px',
        left: '15px',
        bgcolor: '#d3c4ab',
        '&:hover': {
            bgcolor: '#1c1d26',
        },
        width: '26px',
        height: '26px',
        minHeight: '26px',
    }

    return (
        <Zoom
            in={isVisible}
            timeout={transitionDuration}
            style={{
                transitionDelay: `${isVisible ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
        >
            <Fab
                sx={fabGreenStyle}
                aria-label={'scroll-top'}
                onClick={scrollToTop}
                size="small"
            >
                <ArrowUpwardIcon sx={{ width: '0.75em', height: '0.75em' }} />
            </Fab>
        </Zoom>
    )
}
