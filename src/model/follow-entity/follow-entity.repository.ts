import { EntityRepository, AbstractRepository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { code } from '@root/src/shared/enum';
import { FollowEntity } from '@entity/follow.entity';

@EntityRepository(FollowEntity)
export class FollowEntityRepository extends AbstractRepository<FollowEntity> {
  
  async listAllPageUserFollowByIdOfUser(
    userId: number,
    limit = 3,
    offset = 0,
    order: any = 'ASC',
    column = 'id',
    timestampStart = '',
    timestampEnd = '',
  ) {
    return await this.createQueryBuilder('follow')
      .innerJoinAndSelect('follow.page_id', 'page.id')
      .where('follow.user_id = :user_id', { user_id: userId })
      .andWhere('follow.i_am_following = :follow', { follow: true })
      .andWhere(
        `${
          timestampStart
            ? 'follow.timestamp >= :timestampStart'
            : 'follow.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'follow.timestamp <= :timestampEnd'
            : 'follow.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .orderBy(`follow.${column}`, order)
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async countListAllPageUserFollowByIdOfUser(
    userId: number,
    timestampStart: any = false,
    timestampEnd: any = false,
  ) {
    return await this.createQueryBuilder('follow')
      .innerJoinAndSelect('follow.page_id', 'page.id')
      .where('follow.user_id = :user_id', { user_id: userId })
      .andWhere('follow.i_am_following = :follow', { follow: true })
      .andWhere(
        `${
          timestampStart
            ? 'follow.timestamp >= :timestampStart'
            : 'follow.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'follow.timestamp <= :timestampEnd'
            : 'follow.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .limit(1)
      .getCount();
  }

  async listAllUserFollowPageByIdOfPage(
    pageId: number,
    limit = 3,
    offset = 0,
    order: any = 'ASC',
    column = 'id',
    timestampStart = '',
    timestampEnd = '',
  ) {
    return await this.createQueryBuilder('follow')
      .innerJoinAndSelect('follow.user_id', 'page')
      .where('follow.page_id = :page_id', { page_id: pageId })
      .andWhere('follow.i_am_following = :follow', { follow: true })
      .andWhere(
        `${
          timestampStart
            ? 'follow.timestamp >= :timestampStart'
            : 'follow.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'follow.timestamp <= :timestampEnd'
            : 'follow.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .orderBy(`follow.${column}`, order)
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async countListAllUserFollowPageByIdOfPage(
    pageId: number,
    timestampStart: any = false,
    timestampEnd: any = false,
  ) {
    return await this.createQueryBuilder('follow')
      .innerJoinAndSelect('follow.user_id', 'page')
      .where('follow.page_id = :page_id', { page_id: pageId })
      .andWhere('follow.i_am_following = :follow', { follow: true })
      .andWhere(
        `${
          timestampStart
            ? 'follow.timestamp >= :timestampStart'
            : 'follow.timestamp <= now()'
        }`,
        { timestampStart: timestampStart },
      )
      .andWhere(
        `${
          timestampEnd
            ? 'follow.timestamp <= :timestampEnd'
            : 'follow.timestamp <= now()'
        }`,
        { timestampEnd: timestampEnd },
      )
      .limit(1)
      .getCount();
  }
}
