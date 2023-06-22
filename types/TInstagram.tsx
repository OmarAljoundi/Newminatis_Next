export type TInstagram = {
    media_url: string
    media_type: 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM'
    permalink: string
    timestamp: Date
    id: string
    thumbnail_url: string | null
}
