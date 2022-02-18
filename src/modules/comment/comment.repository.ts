import { EntityRepository, Repository, AbstractRepository } from 'typeorm';
import { CommentEntity } from '@root/src/entity/comment.entity';

@EntityRepository(CommentEntity)
export class CommentRepository extends AbstractRepository<CommentEntity> {

  async saulo(id:number){
    return await this.repository.findOne(id)
  }

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
      .getMany();
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
      .getCount();
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
      .getMany();
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
      .getCount();
  }
}
