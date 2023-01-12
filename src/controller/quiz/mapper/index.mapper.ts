import { Quiz, ListQuiz } from '@shared/interfaces/quiz.interface'
import { PublicAnswerQuestion } from './public-answer-auestion'

export class QuizMapper {

    public privateFindOne(field: Quiz) {
        return [{
            id: field.id,
            user_id: field.user_id,
            timestamp: field.timestamp?.toString()
        }]
    }

    public publicFindOne(field: Quiz) {
        return [{
            id: field.id,
            user_id: field.user_id,
            timestamp: field.timestamp.toString(),
        }]
    }

    public privateList(field: ListQuiz) {
        return <ListQuiz>{
            res:field.res.filter((f)=> {
                //delete f.user_id,
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }

    public publicList(field: any) {
        return {
            res:field,
            count:0
        }
    }
    
    public publicQuizAll(field: any[]) {

        let res = []

        for (const key in field) {
            const to =  new PublicAnswerQuestion(field[key])
            let r = to.mapper()
            res.push(r[0])
        }
       
        return {
            res: res,
            count:0
        }
    }

    public publicAnswerQuestion(field: PublicAnswerQuestionInterface) {
        const to =  new PublicAnswerQuestion(field)
        return {
            res: to.mapper(),
            count:0
        }
    }

    public publicListQuizByUserId(field: Quiz) {
        return {
            timestamp: field.timestamp.toString()
        }
    }

    public create(field: any) { 
        return field;
    }

    public update(field: Quiz) {
        return [{
            id: field.id,
            user_id: field.user_id,
            timestamp: field.timestamp?.toString()
        }]
    }

}