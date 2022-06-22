export interface CreatePublication {
    text: string
    number_of_likes: number
    number_of_comments: number
    user_id: number
    page_id: number
}
  
export interface UpdatePublication {
    id: number
    text: string
    user_id: number
}

export interface Publication {
    id: number
    text: string
    number_of_likes: number
    number_of_comments: number
    timestamp: Date
    page_id: number
    user_id: number
}

export interface ListPublication {
    res: Publication[]
    count: number
}