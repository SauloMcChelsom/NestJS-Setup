export interface ListQuiz {
    res: Quiz[]
    count: number
}

export interface Quiz {
    id: number;
    title_name: string;
    level: string
    timestamp: Date;
    user_id: number;
}

export interface Questions {
    id: number;
    question_name: string;
    timestamp: Date;
    quiz_id: number;
}

export class Responses {
    id: number;
    response_name: string;
    correct: string;
    timestamp: Date;
    questions_id: number;
}