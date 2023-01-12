export class PublicAnswerQuestion {
   
    constructor(private field:PublicAnswerQuestionInterface){}

    public mapper(){
        //return [this.field]
        return this.formatter()
    }

    private formatter(){
        let questio = []
        for (const i in this.field.question) {
            let questionns
            for (const key in this.field.form) {
                if(this.field.form[key].question_id == this.field.question[i].id){

                   let res = []
                    for (const r in this.field.question[i].response) {
                         res.push({
                            is_correct: this.field.question[i].response[r].correct,
                            response_name: this.field.question[i].response[r].response_name,
                            response_id: this.field.question[i].response[r].id
                        })
                    }
                    questionns = {             
                        question_name: this.field.question[i].question_name,
                        is_marked: this.field.form[key].is_marked,
                        question_id: this.field.form[key].question_id,
                        marked_response_id: this.field.form[key].marked_response_id,
                        response: res
                    }
                    res = []
                    break
                }
            }
            if(questionns == null && this.field.question[i].id){
                let res = []
                for (const r in this.field.question[i].response) {
                     res.push({
                        is_correct: this.field.question[i].response[r].correct,
                        response_name: this.field.question[i].response[r].response_name,
                        response_id: this.field.question[i].response[r].id
                    })
                }
                questionns = {             
                    question_name: this.field.question[i].question_name,
                    is_marked: false,
                    question_id: this.field.question[i].id,
                    marked_response_id: null,
                    response: res
                }
                res = []
                questio.push(questionns)
            }else{
                questio.push(questionns)
            }
            
        }

        return [{
            title: {
                level: this.field.title.level,
                title_name: this.field.title.title_name,
                creator_id: this.field.title.user_id,
                follower_id: 0,
                total_of_questions: this.field.question.length,
            },
            question: questio
        }]
    }


}
