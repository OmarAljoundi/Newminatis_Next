export type TBlogs = {
    id: number
    title: string
    description: string
    published: boolean
    createdDate: Date | null
    blogImages?: TBlogImages[] | null
    blogSlides?: TBlogSlides[] | null
}

export type TBlogImages = {
    id: number
    blogId: number
    imageUrl: string
    sortOrder: number
}

export type TBlogSlides = {
    id: number
    blogId: number
    imageUrl: string
    sortOrder: number
    text: string
}
