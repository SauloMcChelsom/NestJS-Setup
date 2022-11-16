import { EntityRepository, AbstractRepository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { code } from '@root/src/shared/enum';
import { QuestionEntity } from '@root/src/entity/question.entity';

@EntityRepository(QuestionEntity)
export class QuestionEntityRepository extends AbstractRepository<QuestionEntity> {

  async listByUserId(
    userId: number,
    search = '',
    limit = 3,
    offset = 0,
    order: any = 'ASC',
    column = 'id',
    timestampStart = '',
    timestampEnd = '',
  ) {
    return await this.createQueryBuilder('quiz')
      .where('quiz.user_id = :userId', { userId: userId })
      .andWhere('quiz.quiz ILIKE :searchQuery', {
        searchQuery: `%${search}%`,
      })
      .andWhere(
        `${
          timestampStart
            ? 'quiz.timestamp >= :timestampStart'
            : 'quiz.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'quiz.timestamp <= :timestampEnd'
            : 'quiz.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .orderBy(`quiz.${column}`, order)
      .limit(limit)
      .offset(offset)
      .getMany()
      .catch(err => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST);
      })

  }

  async countListByUserId(
    userId: number,
    search = '',
    timestampStart: any = false,
    timestampEnd: any = false,
  ) {
    return await this.createQueryBuilder('quiz')
      .where('quiz.user_id = :userId', { userId: userId })
      .andWhere('quiz.quiz ILIKE :searchQuery', {
        searchQuery: `%${search}%`,
      })
      .andWhere(
        `${
          timestampStart
            ? 'quiz.timestamp >= :timestampStart'
            : 'quiz.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'quiz.timestamp <= :timestampEnd'
            : 'quiz.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .limit(1)
      .getCount()
      .catch(err => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST);
      });
  }

  async listByPublicationId(
    publicationId: number,
    search = '',
    limit = 3,
    offset = 0,
    order: any = 'ASC',
    column = 'id',
    timestampStart = '',
    timestampEnd = '',
  ) {
    return await this.createQueryBuilder('quiz')
    .where('quiz.publication_id = :publicationId', {
      publicationId: publicationId,
    })
    .andWhere('quiz.quiz ILIKE :searchQuery', {
      searchQuery: `%${search}%`,
    })
    .andWhere(
      `${
        timestampStart
          ? 'quiz.timestamp >= :timestampStart'
          : 'quiz.timestamp <= now()'
      }`,
      { timestampStart: timestampStart },
    )
    .andWhere(
      `${
        timestampEnd
          ? 'quiz.timestamp <= :timestampEnd'
          : 'quiz.timestamp <= now()'
      }`,
      { timestampEnd: timestampEnd },
    )
    .orderBy(`quiz.${column}`, order)
    .limit(limit)
    .offset(offset)
    .getMany()
    .catch(err => {
      throw new HttpException({
        code : code.QUERY_FAILED,
        message : `${err.detail || err.hint || err.routine}`,
        description : ''
      }, HttpStatus.BAD_REQUEST);
    });
  }

  async countListByPublicationId(
    publicationId: number,
    search = '',
    timestampStart: any = false,
    timestampEnd: any = false,
  ) {
    return await this.createQueryBuilder('quiz')
      .where('quiz.publication_id = :publicationId', {
        publicationId: publicationId,
      })
      .andWhere('quiz.quiz ILIKE :searchQuery', {
        searchQuery: `%${search}%`,
      })
      .andWhere(
        `${
          timestampStart
            ? 'quiz.timestamp >= :timestampStart'
            : 'quiz.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'quiz.timestamp <= :timestampEnd'
            : 'quiz.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .limit(1)
      .getCount()
      .catch(err => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST);
      });
  }
}
