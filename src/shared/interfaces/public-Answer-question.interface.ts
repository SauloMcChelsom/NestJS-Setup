interface Title {
    id: number,
    title_name: string,
    level: string,
    timestamp: string | any,
    user_id: number
}

interface Question {
    id: number,
    question_name: string,
    timestamp: string,
    title_id: number,
    response: Response[]
}

interface Response {
    id: number,
    response_name: string,
    correct: true,
    timestamp: string,
    question_id: number
}

interface Form {
    id: number,
    is_marked: boolean,
    timestamp: string,
    question_id: number,
    creator_id: number,
    follower_id: number,
    marked_response_id: number
}

interface PublicAnswerQuestionInterface {
    title: Title,
    question: Question[],
    form: Form[]
}