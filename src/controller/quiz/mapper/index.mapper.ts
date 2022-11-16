import { Quiz, ListQuiz } from '@shared/interfaces/quiz.interface'

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

    public publicList(field: ListQuiz) {
        return <ListQuiz>{
            res:field.res.filter((f)=> {
                //delete f.user_id,
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }

    public publicListQuizByUserId(field: Quiz) {
        return {
            timestamp: field.timestamp.toString()
        }
    }

    public create(field: any) {
        return field;
        /*return [{
            id: field.id,
            user_id: field.user_id,
            title_name: field.title_name,
            level: field.level,
            timestamp: field.timestamp?.toString()
        }]*/
    }

    public update(field: Quiz) {
        return [{
            id: field.id,
            user_id: field.user_id,
            timestamp: field.timestamp?.toString()
        }]
    }

}