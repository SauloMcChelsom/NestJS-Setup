export class PublicAnswerQuestion {

    private res
   
    constructor(private field:PublicAnswerQuestionInterface){}

    public mapper(){
        //return [this.field]
        return this.formatter()
    }

    private formatter(){
        return this.res = [{
            title: {
                level: this.field.title.level,
                title_name: this.field.title.title_name,
                creator_id: this.field.title.user_id,
                follower_id: 0,
                total_of_questions: this.field.question.length,
            },
            question: [
                {             
                    question_name: this.field.question[0].question_name,
                    is_marked: this.field.form[0].is_marked,
                    question_id: this.field.form[0].question_id,
                    marked_response_id: this.field.form[0].marked_response_id,
                    response: [
                        {
                            correct: this.field.question[0].response[0].correct,
                            response_name: this.field.question[0].response[0].response_name,
                            response_id: this.field.question[0].response[0].id
                        },
                        {
                            correct: this.field.question[0].response[1].correct,
                            response_name: this.field.question[0].response[1].response_name,
                            response_id: this.field.question[0].response[1].id
                        }
                    ]
                }
            ]
        }]
    }


}
