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
    const title = await this.titleModel.create(body.title);
    body.title = title

    body.question[0].title_id = title.id
    const questio:any = await this.questionModel.create(body.question[0]);
    body.question[0] = questio

    body.question[0].response[0].question_id = questio.id
    const responses:any = await this.responseModel.create(body.question[0].response[0]);
    body.question[0].response[0] = responses
    
    return body
  }
}
