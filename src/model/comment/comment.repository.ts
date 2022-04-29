import { EntityRepository, AbstractRepository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CommentEntity } from '@root/src/entity/comment.entity';
import { code } from '@root/src/shared/enum';

@EntityRepository(CommentEntity)
export class CommentRepository extends AbstractRepository<CommentEntity> {

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
    return await this.createQueryBuilder('comment')
      .where('comment.user_id = :userId', { userId: userId })
      .andWhere('comment.comment ILIKE :searchQuery', {
        searchQuery: `%${search}%`,
      })
      .andWhere(
        `${
          timestampStart
            ? 'comment.timestamp >= :timestampStart'
            : 'comment.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'comment.timestamp <= :timestampEnd'
            : 'comment.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .orderBy(`comment.${column}`, order)
      .limit(limit)
      .offset(offset)
      .getMany()
      .catch(err => {
        console.log(err)
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST);
      });

  }

  async countListByUserId(
    userId: number,
    search = '',
    timestampStart: any = false,
    timestampEnd: any = false,
  ) {
    return await this.createQueryBuilder('comment')
      .where('comment.user_id = :userId', { userId: userId })
      .andWhere('comment.comment ILIKE :searchQuery', {
        searchQuery: `%${search}%`,
      })
      .andWhere(
        `${
          timestampStart
            ? 'comment.timestamp >= :timestampStart'
            : 'comment.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'comment.timestamp <= :timestampEnd'
            : 'comment.timestamp <= now()'
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
    return await this.createQueryBuilder('comment')
    .where('comment.publication_id = :publicationId', {
      publicationId: publicationId,
    })
    .andWhere('comment.comment ILIKE :searchQuery', {
      searchQuery: `%${search}%`,
    })
    .andWhere(
      `${
        timestampStart
          ? 'comment.timestamp >= :timestampStart'
          : 'comment.timestamp <= now()'
      }`,
      { timestampStart: timestampStart },
    )
    .andWhere(
      `${
        timestampEnd
          ? 'comment.timestamp <= :timestampEnd'
          : 'comment.timestamp <= now()'
      }`,
      { timestampEnd: timestampEnd },
    )
    .orderBy(`comment.${column}`, order)
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
    return await this.createQueryBuilder('comment')
      .where('comment.publication_id = :publicationId', {
        publicationId: publicationId,
      })
      .andWhere('comment.comment ILIKE :searchQuery', {
        searchQuery: `%${search}%`,
      })
      .andWhere(
        `${
          timestampStart
            ? 'comment.timestamp >= :timestampStart'
            : 'comment.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'comment.timestamp <= :timestampEnd'
            : 'comment.timestamp <= now()'
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
