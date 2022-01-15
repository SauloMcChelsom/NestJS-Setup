import { EntityRepository, Repository } from 'typeorm'
import { FollowEntity } from '../../entity/follow.entity'

@EntityRepository(FollowEntity)
export class FollowRepository extends Repository<FollowEntity> {

    async listAllPageUserFollowByIdOfUser(userId:string, search:string = '',  limit:number=3, offset:number=0, order:any='ASC', column:string='id', timestampStart:string='', timestampEnd:string=''){
        return await  this.createQueryBuilder("follow")
        .innerJoinAndSelect("follow.page_id", "page.id")
        .where("follow.user_id = :user_id", { user_id: userId })
        .andWhere("follow.i_am_following = :follow", { follow: true })
        .andWhere(`${timestampStart?'follow.timestamp >= :timestampStart':'follow.timestamp <= now()'}`, {timestampStart: timestampStart})
        .andWhere(`${timestampEnd?'follow.timestamp <= :timestampEnd':'follow.timestamp <= now()'}`, {timestampEnd: timestampEnd})
        .orderBy(`follow.${column}`, order)
        .limit(limit)
        .offset(offset)
        .getMany();
    }

    async countListAllPageUserFollowByIdOfUser(userId:string, search:string = '', timestampStart:any=false, timestampEnd:any=false){
        return await  this.createQueryBuilder("follow")
        .innerJoinAndSelect("follow.page_id", "page.id")
        .where("follow.user_id = :user_id", { user_id: userId })
        .andWhere("follow.i_am_following = :follow", { follow: true })
        .andWhere(`${timestampStart?'follow.timestamp >= :timestampStart':'follow.timestamp <= now()'}`, {timestampStart: timestampStart})
        .andWhere(`${timestampEnd?'follow.timestamp <= :timestampEnd':'follow.timestamp <= now()'}`, {timestampEnd: timestampEnd})
        .limit(1)
        .getCount()
    }

    async listAllUserFollowPageByIdOfPage(pageId:string, search:string = '',  limit:number=3, offset:number=0, order:any='ASC', column:string='id', timestampStart:string='', timestampEnd:string=''){
        return await this.createQueryBuilder('follow')
        .innerJoinAndSelect("follow.user_id", "page")
        .where("follow.page_id = :page_id", { page_id: pageId })
        .andWhere("follow.i_am_following = :follow", { follow: true })
        .andWhere(`${timestampStart?'follow.timestamp >= :timestampStart':'follow.timestamp <= now()'}`, {timestampStart: timestampStart})
        .andWhere(`${timestampEnd?'follow.timestamp <= :timestampEnd':'follow.timestamp <= now()'}`, {timestampEnd: timestampEnd})
        .orderBy(`follow.${column}`, order)
        .limit(limit)
        .offset(offset)
        .getMany();
    }

    async countListAllUserFollowPageByIdOfPage(pageId:string, search:string = '', timestampStart:any=false, timestampEnd:any=false){
        return await this.createQueryBuilder('follow')
        .innerJoinAndSelect("follow.user_id", "page")
        .where("follow.page_id = :page_id", { page_id: pageId })
        .andWhere("follow.i_am_following = :follow", { follow: true })
        .andWhere(`${timestampStart?'follow.timestamp >= :timestampStart':'follow.timestamp <= now()'}`, {timestampStart: timestampStart})
        .andWhere(`${timestampEnd?'follow.timestamp <= :timestampEnd':'follow.timestamp <= now()'}`, {timestampEnd: timestampEnd})
        .limit(1)
        .getCount()
    }
}
