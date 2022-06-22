export interface CreatePage {
    page_description: string
    page_name: string
    number_of_followers?: number
    user_id: number
}

export interface Page {
    id: number
    user_id: number
    page_name: string
    page_description: string
    number_of_followers:number
    timestamp: Date
}

export interface UpdatePage {
    id: number
    page_description: string
    page_name: string
    user_id: number
}

export interface ListPage {
    res: Page[]
    count: number
}
