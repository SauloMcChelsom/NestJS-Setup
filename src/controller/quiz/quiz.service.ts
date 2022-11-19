import { Injectable } from '@nestjs/common';
import { TitleEntityModel } from '@root/src/model/quiz-entity/title/title-entity.model'
import { QuestionEntityModel } from '@root/src/model/quiz-entity/question/question-entity.model'
import { ResponseEntityModel } from '@root/src/model/quiz-entity/response/response-entity.model'
import { CreateDTO } from './dto/index.dto'

@Injectable()
export class QuizService { 
  constructor(
    private responseModel: ResponseEntityModel,
    private questionModel: QuestionEntityModel,
    private titleModel: TitleEntityModel
  ) {}

  public async create(body: CreateDTO) {
    body = await this.createTitle(body);
    body = await this.createQuestion(body);
    body = await this.createResponse(body);
    return body
  }

  private async createResponse(body: CreateDTO): Promise<CreateDTO>{
    let response = []
    for (const key in body.question) {
      for (const id in body.question[key].response) {
        body.question[key].response[id].question_id = body.question[key].id
        let element = await this.responseModel.create(body.question[key].response[id]);
        response.push(element)
      }
      body.question[key].response = response
      response = []
    }  
    return body;
  }

  private async createQuestion(body: CreateDTO){
    let question = []
    for (const itens in body.question) {
      body.question[itens].title_id = body.title.id
      let element = await this.questionModel.create(body.question[itens]);
      question.push(element)
    }
    body.question = question
    return body
  }

  private async createTitle(body: CreateDTO): Promise<CreateDTO>{
    const title = await this.titleModel.create(body.title);
    body.title = title
    return body;
  }


}
