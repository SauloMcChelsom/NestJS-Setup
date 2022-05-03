export interface CreateLike {
    user_id: number
    i_liked?: boolean
    publication_id: number
}
  
export interface Like {
    id: number
    i_liked: boolean
    publication_id: number
    user_id: number
}