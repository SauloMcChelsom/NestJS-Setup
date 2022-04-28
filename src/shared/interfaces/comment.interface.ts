export interface CreateComment {
    comment: string;
    publication_id: number;
    user_id: number;
}

export interface UpdateComment {
    id: number;
    comment: string;
    user_id: number;
}
    
export interface Comment {
    id: number
    comment: string
    timestamp: Date
    publication_id: number
    user_id: number
}

export interface ListComment {
    res: Comment[];
    count: number;
}

