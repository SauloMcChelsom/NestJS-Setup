import { FollowInterface } from '../interface/follow.interface'

export class CreateFallowMapper {
    public toMapper(fallow:FollowInterface){
        return {
            id : fallow.id,
            user_id : fallow.user_id,
            page_id : fallow.page_id,
            i_am_following : fallow.i_am_following,
            timestamp : fallow.timestamp?.toString()
        }
    }
}