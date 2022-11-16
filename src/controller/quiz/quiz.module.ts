import { Module } from '@nestjs/common';

import { PublicationEntityModule } from '@model/publication-entity/publication-entity.module'
import { JwtLocalModule } from '@model/jwt-local/jwt-local.module';

import { QuestionEntityModule } from '@root/src/model/quiz-entity/question/question-entity.module';
import { ResponseEntityModule } from '@root/src/model/quiz-entity/response/response-entity.module';
import { TitleEntityModule } from '@root/src/model/quiz-entity/title/title-entity.module';

import { UserEntityModule } from '@root/src/model/user-entity/user-entity.module'

import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizMapper } from './mapper/index.mapper';

@Module({
  imports: [
    JwtLocalModule,
    QuestionEntityModule,
    ResponseEntityModule,
    TitleEntityModule,
    UserEntityModule,
    PublicationEntityModule
  ],
  controllers: [QuizController],
  providers: [
    QuizService,
    QuizMapper
  ],
  exports: [QuizService],
})
export class QuizModule {}
