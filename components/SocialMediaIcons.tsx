import { FlexBox } from './flex-box'
import { IconButton } from '@mui/material'
import { AiFillFacebook } from 'react-icons/ai'
import { FaTiktok } from 'react-icons/fa'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BsPinterest } from 'react-icons/bs'
import { AiFillYoutube } from 'react-icons/ai'
import { FC } from 'react'

export const SocialMediaIcons: FC<{ color?: string }> = ({
    color = 'white',
}) => {
    return (
        <FlexBox className="flex">
            {iconList.map((item, ind) => (
                <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopenner"
                    key={ind}
                >
                    <IconButton
                        sx={{
                            margin: 0.5,
                            fontSize: 12,
                            padding: '10px',
                            backgroundColor: 'rgba(0,0,0,0.2)',
                        }}
                    >
                        <item.icon fontSize="inherit" color={color} size={25} />
                    </IconButton>
                </a>
            ))}
        </FlexBox>
    )
}

const iconList = [
    { icon: AiFillFacebook, url: 'https://www.facebook.com/newminatis' },
    {
        icon: FaTiktok,
        url: 'https://www.tiktok.com/@newminatis?_t=8VDPPjdihwQ&_r=1',
    },
    {
        icon: AiOutlineWhatsApp,
        url: 'https://api.whatsapp.com/send/?phone=14158181185&text=Hello%2C+i+have+a+question+regarding+my+order.&type=phone_number&app_absent=0',
    },

    { icon: AiOutlineInstagram, url: 'https://www.instagram.com/newminatis/' },
    {
        icon: AiFillYoutube,
        url: 'https://www.youtube.com/@newminatis',
        resize: true,
    },
    {
        icon: BsPinterest,
        url: 'https://www.pinterest.com/newminatis/',
    },
]
