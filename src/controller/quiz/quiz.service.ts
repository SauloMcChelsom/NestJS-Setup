import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { code } from '@root/src/shared/enum';
import { ListFilter} from '@shared/interfaces'
import { TitleEntityModel } from '@root/src/model/quiz-entity/title/title-entity.model'
import { QuestionEntityModel } from '@root/src/model/quiz-entity/question/question-entity.model'
import { ResponseEntityModel } from '@root/src/model/quiz-entity/response/response-entity.model'
import { CreateDTO } from './dto/index.dto'
import { FormEntityModel } from '@root/src/model/quiz-entity/form/form-entity.model';
import { QuestionEntity } from '@root/src/entity/question.entity';

@Injectable()
export class QuizService { 
  constructor(
    private responseModel: ResponseEntityModel,
    private questionModel: QuestionEntityModel,
    private titleModel: TitleEntityModel,
    private formModel: FormEntityModel
  ) {}

  public async newAnswerQuestion(body){
    return this.formModel.create(body)
  }

  public async publicAnswerQuestion(title_id:number, follower_id:number){
    let title =  await this.findTitleById(title_id)
    let question  = await this.findQuestionById(title.id)
    let questions = await this.findResponseByQuestionId(question)
    let forms = await this.findFormByfollowerIdAndQuestionId(question, follower_id)
    let res:PublicAnswerQuestionInterface
    res = {
      title:title,  question:questions, form:forms,

    }
    return res 
  }

  private async  findResponseByQuestionId(question:QuestionIF){
    let questions = []
    for (const key in question.res) {
      let question_id = question.res[key].id
      let response = await this.responseModel.findResponseByQuestionId(question_id)
      questions.push({ ...question.res[key], response: response.res})
    }
    return questions
  }

  private async findFormByfollowerIdAndQuestionId(question:QuestionIF, follower_id:number){
    let forms = []
    for (const key in question.res) {
      let question_id = question.res[key].id
      let response = await this.formModel.findFormByfollowerIdAndQuestionId(question_id, follower_id)
      forms.push(...response)
    }
    return forms
  }

  private async findTitleById(title_id:number){
    return await this.titleModel.findOneById(title_id)
  }

  private async findQuestionById(title_id:number){
    return await this.questionModel.findQuestionByTitleId(title_id)
  }


  public async create(body: CreateDTO) {
    this.ValidateAnswerCorrect(body)
    body = await this.createTitle(body);
    body = await this.createQuestion(body);
    body = await this.createResponse(body);
    return body
  }

  private ValidateAnswerCorrect(body: CreateDTO){
    let response = []
    for (const key in body.question) {
      for (const id in body.question[key].response) {
        body.question[key].response[id].question_id = body.question[key].id
        let element = body.question[key].response[id].correct ? 'ok' : 'err'
        response.push(element)
      }
      if(!this.CountAnswerCorrect(response)){
        break
      }
      response = []
    }
  }

  private CountAnswerCorrect(arr){

    type Counts = { ok:number, err:number }

    let counts:Counts = {
      ok:0, 
      err:0
    };

    for (let num of arr) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    if(counts.ok == 0){
      throw new HttpException({
        code : "CORRECT_FAILURE",
        message : `Você marcou todas falsas`,
        description : ''
      }, HttpStatus.BAD_REQUEST)
    }

    if(counts.err == 0 ){
      throw new HttpException({
        code : "CORRECT_FAILURE",
        message : `Você marcou todas verdadeiras`,
        description : ''
      }, HttpStatus.BAD_REQUEST)
    }

    if(counts.ok > 1 ){
      throw new HttpException({
        code : "CORRECT_FAILURE",
        message : `Você marcou mais de uma verdadeira`,
        description : ''
      }, HttpStatus.BAD_REQUEST)
    }

    if(counts.err == 1 || counts.ok == 1){
      return true
    }
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

interface QuestionIF {
  res: QuestionEntity[];
  count: number;
}