import { EntityRepository, Repository } from 'typeorm';
import { PublicationEntity } from '@root/src/entity/publication.entity';

@EntityRepository(PublicationEntity)
export class PublicationEntityRepository extends Repository<PublicationEntity> {
  async listPublicationByPage(
    id = 0,
    limit = 3,
    offset = 0,
    order: any = 'ASC',
    column = 'id',
    timestampStart = '',
    timestampEnd = '',
  ) {
    return await this.createQueryBuilder('publication')
      .where(
        `${
          timestampStart
            ? 'publication.timestamp >= :timestampStart'
            : 'publication.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'publication.timestamp <= :timestampEnd'
            : 'publication.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .andWhere('publication.user_id = :userId', { userId: id })
      .orderBy(`publication.${column}`, order)
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async countListPublicationByPage(id = 0,timestampStart: any = false, timestampEnd: any = false) {
    return await this.createQueryBuilder('publication')
      .andWhere(
        `${
          timestampStart
            ? 'publication.timestamp >= :timestampStart'
            : 'publication.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'publication.timestamp <= :timestampEnd'
            : 'publication.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .andWhere('publication.user_id = :userId', { userId: id })
      .limit(1)
      .getCount();
  }


  async listFeed(
    limit = 3,
    offset = 0,
    order: any = 'ASC',
    column = 'id',
    timestampStart = '',
    timestampEnd = '',
  ) {
    return await this.createQueryBuilder('publication')
      .where(
        `${
          timestampStart
            ? 'publication.timestamp >= :timestampStart'
            : 'publication.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'publication.timestamp <= :timestampEnd'
            : 'publication.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .orderBy(`publication.${column}`, order)
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async countListFeed(timestampStart: any = false, timestampEnd: any = false) {
    return await this.createQueryBuilder('publication')
      .andWhere(
        `${
          timestampStart
            ? 'publication.timestamp >= :timestampStart'
            : 'publication.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'publication.timestamp <= :timestampEnd'
            : 'publication.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .limit(1)
      .getCount();
  }

  async listSearchByText(
    search = '',
    limit = 3,
    offset = 0,
    order: any = 'ASC',
    column = 'id',
    timestampStart = '',
    timestampEnd = '',
  ) {
    return await this.createQueryBuilder('publication')
      .where('publication.text ILIKE :searchQuery', {
        searchQuery: `%${search}%`,
      })
      .andWhere(
        `${
          timestampStart
            ? 'publication.timestamp >= :timestampStart'
            : 'publication.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'publication.timestamp <= :timestampEnd'
            : 'publication.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .orderBy(`publication.${column}`, order)
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async countListSearchByText(
    search = '',
    timestampStart: any = false,
    timestampEnd: any = false,
  ) {
    return await this.createQueryBuilder('publication')
      .where('publication.text ILIKE :searchQuery', {
        searchQuery: `%${search}%`,
      })
      .andWhere(
        `${
          timestampStart
            ? 'publication.timestamp >= :timestampStart'
            : 'publication.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'publication.timestamp <= :timestampEnd'
            : 'publication.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .limit(1)
      .getCount();
  }
}
