import {
  Version,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Param,
  Get,
  Query,
  Post,
  Body,
  Put,
  Delete,
  UseGuards, 
  UseInterceptors, 
  UseFilters 
} from '@nestjs/common'

import { JwtAuthAccessTokenGuard } from '@shared/guard/jwt-auth.guard'
import { JwtAuthRefreshTokenGuard } from '@shared/guard/refresh-token.guard'
import { RolesGuard } from '@shared/guard/roles.guard'
import { UserMachinePropertyGuard } from '@shared/guard/user-machine-property.guard'

import { UID } from '@shared/pipe/token.pipe'

import { Header } from '@shared/decorator/header.decorator'
import { hasRoles } from '@shared/decorator/roles.decorator'

import { Error } from '@shared/response/error.response'
import { Success } from '@shared/response/success.response'
import { OK } from '@shared/response/ok'

import { Role, code } from '@shared/enum'
import { ListFilter} from '@shared/interfaces'
import { UserEntityModel } from '@root/src/model/user-entity/user-entity.model'

import { QuizService } from './quiz.service'
import { CreateDTO } from './dto/index.dto'
import { QuizMapper } from './mapper/index.mapper'
import { Model } from 'firebase-admin/lib/machine-learning/machine-learning'

@Controller('quiz')
export class QuizController {

  constructor(
    private readonly service: QuizService,
    private userModel: UserEntityModel,
    private toMapper:QuizMapper
  ) {}

  @Get('/quiz-all/follower/:follower_id')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicQuizAll(@Param('follower_id') follower_id: number) {
    const { res, count } = await this.service.publicQuizAll(follower_id).then(res => this.toMapper.publicQuizAll(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Get('/answer-question/title/:title_id/follower/:follower_id')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicAnswerQuestion(@Param('title_id') title_id: number, @Param('follower_id') follower_id: number) {
    const { res, count } = await this.service.publicAnswerQuestion(title_id, follower_id).then(res => this.toMapper.publicAnswerQuestion(res))
    return new OK(res, code.SUCCESSFULLY_FOUND, null, count)
  }

  @Post('/answer-question')
  @Version('1/public')
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async publicNewAnswerQuestion(@Body() body: any) {

    const res = await this.service.newAnswerQuestion(body).then(res => this.toMapper.create(res))
    return new OK(res, code.SUCCESSFULLY_CREATED)
  }

  @Post()
  @Version('1/private')
  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthAccessTokenGuard, JwtAuthRefreshTokenGuard, UserMachinePropertyGuard, RolesGuard)
  @UseFilters(Error)
  @UseInterceptors(Success)
  public async createQuiz(@Body() body: CreateDTO, @Header(new UID()) token: string){
    const user = await this.userModel.getUserByUid(token)
    body.title.user_id = user.id

    const res = await this.service.create(body).then(res => this.toMapper.create(res))
    return new OK(res, code.SUCCESSFULLY_CREATED)
  }

}
/*
mapper irar fica com a regrada de contar numero de questão respondidas e numeros de questão do titulo 2 de 10,
não e legal deixar totalizador, transformador, modificador.... em Model, pois o mesmo sera reutilizados por
outras classes*/