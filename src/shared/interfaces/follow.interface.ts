export interface CreateFollow {
    user_id: number
    page_id: number
    i_am_following: boolean
}

export interface Follow {
    id: number
    i_am_following: boolean
    page_id: number
    user_id: number
    timestamp: Date
}

export interface ListFollow {
    res: Follow[]
    count: number
}