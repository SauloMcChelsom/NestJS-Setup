import { EntityRepository, Repository } from 'typeorm'
import { CommentEntity } from '@root/src/entity/comment.entity'

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
    
    async listCommentByUserId(userId:string, search:string = '',  limit:number=3, offset:number=0, order:any='ASC', column:string='id', timestampStart:string='', timestampEnd:string=''){
        return await this.createQueryBuilder('comment')
        .where("comment.user_id = :userId", { userId: userId })
        .andWhere('comment.comment ILIKE :searchQuery', {searchQuery: `%${search}%`})
        .andWhere(`${timestampStart?'comment.timestamp >= :timestampStart':'comment.timestamp <= now()'}`, {timestampStart: timestampStart})
        .andWhere(`${timestampEnd?'comment.timestamp <= :timestampEnd':'comment.timestamp <= now()'}`, {timestampEnd: timestampEnd})
        .orderBy(`comment.${column}`, order)
        .limit(limit)
        .offset(offset)
        .getMany();
    }

    async getCount(userId:string, search:string = '',timestampStart:any=false, timestampEnd:any=false){
        return await this.createQueryBuilder('comment')
        .where("comment.user_id = :userId", { userId: userId })
        .andWhere('comment.comment ILIKE :searchQuery', {searchQuery: `%${search}%`})
        .andWhere(`${timestampStart?'comment.timestamp >= :timestampStart':'comment.timestamp <= now()'}`, {timestampStart: timestampStart})
        .andWhere(`${timestampEnd?'comment.timestamp <= :timestampEnd':'comment.timestamp <= now()'}`, {timestampEnd: timestampEnd})
        .limit(1)
        .getCount()
    }
}