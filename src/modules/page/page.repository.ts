import { EntityRepository, Repository } from 'typeorm'
import { PageEntity } from '../../entity/page.entity'

@EntityRepository(PageEntity)
export class PageRepository extends Repository<PageEntity> {
    async listAll(search:string = '',  limit:number=3, offset:number=0, order:any='ASC', column:string='id', timestampStart:string='', timestampEnd:string=''){
        return await this.createQueryBuilder('page')
        .where('page.page_name ILIKE :searchQuery', {searchQuery: `%${search}%`})
        .andWhere(`${timestampStart?'page.timestamp >= :timestampStart':'page.timestamp <= now()'}`, {timestampStart: timestampStart})
        .andWhere(`${timestampEnd?'page.timestamp <= :timestampEnd':'page.timestamp <= now()'}`, {timestampEnd: timestampEnd})
        .orderBy(`page.${column}`, order)
        .limit(limit)
        .offset(offset)
        .getMany();
    }

    async countListAll(search:string = '',timestampStart:any=false, timestampEnd:any=false){
        return await this.createQueryBuilder('page')
        .where('page.page_name ILIKE :searchQuery', {searchQuery: `%${search}%`})
        .andWhere(`${timestampStart?'page.timestamp >= :timestampStart':'page.timestamp <= now()'}`, {timestampStart: timestampStart})
        .andWhere(`${timestampEnd?'page.timestamp <= :timestampEnd':'page.timestamp <= now()'}`, {timestampEnd: timestampEnd})
        .limit(1)
        .getCount()
    }
}
