import { EntityRepository, Repository } from 'typeorm'
import { PageSegmentsEntity } from '../../entity/page-segments.entity'

@EntityRepository(PageSegmentsEntity)
export class PageSegmentsRepository extends Repository<PageSegmentsEntity> {

    async findAllPageUserFollowByIdOfUser(id:any){
        return await  this.createQueryBuilder("page_segments")
        .innerJoinAndSelect("page_segments.page_id", "page.id")
        .where("page_segments.user_id = :user_id", { user_id: id })
        .andWhere("page_segments.i_am_following = :page_segments", { page_segments: true })
        .orderBy("page_segments.id", "ASC")//ASC DESC
        .getMany();
    }

    async findAllUserFollowPageByIdOfPage(id:any){
        return await  this.createQueryBuilder("page_segments")
        .innerJoinAndSelect("page_segments.user_id", "page")
        .where("page_segments.page_id = :page_id", { page_id: id })
        .andWhere("page_segments.i_am_following = :page_segments", { page_segments: true })
        .orderBy("page_segments.id", "ASC")//ASC DESC
        .getMany();
    }
}
