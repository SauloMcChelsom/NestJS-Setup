import { EntityRepository, Repository } from 'typeorm'
import { PublicationEntity } from '@root/src/entity/publication.entity'

@EntityRepository(PublicationEntity)
export class PublicationRepository extends Repository<PublicationEntity> {

  async listFeed(search:string = '',  limit:number=3, offset:number=0, order:any='ASC', column:string='id', timestampStart:string='', timestampEnd:string=''){
    return await this.createQueryBuilder('publication')
    .where(`${timestampStart?'publication.timestamp >= :timestampStart':'publication.timestamp <= now()'}`, {timestampStart: timestampStart})
    .andWhere(`${timestampEnd?'publication.timestamp <= :timestampEnd':'publication.timestamp <= now()'}`, {timestampEnd: timestampEnd})
    .orderBy(`publication.${column}`, order)
    .limit(limit)
    .offset(offset)
    .getMany();
  }

  async countListFeed(search:string = '',timestampStart:any=false, timestampEnd:any=false){
    return await this.createQueryBuilder('publication')
    .andWhere(`${timestampStart?'publication.timestamp >= :timestampStart':'publication.timestamp <= now()'}`, {timestampStart: timestampStart})
    .andWhere(`${timestampEnd?'publication.timestamp <= :timestampEnd':'publication.timestamp <= now()'}`, {timestampEnd: timestampEnd})
    .limit(1)
    .getCount()
  }

  async listSearchByText(search:string = '',  limit:number=3, offset:number=0, order:any='ASC', column:string='id', timestampStart:string='', timestampEnd:string=''){
    return await this.createQueryBuilder('publication')
    .where('publication.text ILIKE :searchQuery', {searchQuery: `%${search}%`})
    .andWhere(`${timestampStart?'publication.timestamp >= :timestampStart':'publication.timestamp <= now()'}`, {timestampStart: timestampStart})
    .andWhere(`${timestampEnd?'publication.timestamp <= :timestampEnd':'publication.timestamp <= now()'}`, {timestampEnd: timestampEnd})
    .orderBy(`publication.${column}`, order)
    .limit(limit)
    .offset(offset)
    .getMany();
  }

  async countListSearchByText(search:string = '',timestampStart:any=false, timestampEnd:any=false){
    return await this.createQueryBuilder('publication')
    .where('publication.text ILIKE :searchQuery', {searchQuery: `%${search}%`})
    .andWhere(`${timestampStart?'publication.timestamp >= :timestampStart':'publication.timestamp <= now()'}`, {timestampStart: timestampStart})
    .andWhere(`${timestampEnd?'publication.timestamp <= :timestampEnd':'publication.timestamp <= now()'}`, {timestampEnd: timestampEnd})
    .limit(1)
    .getCount()
  }
  
}