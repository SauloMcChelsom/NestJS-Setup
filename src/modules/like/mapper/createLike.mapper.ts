import { LikeInterface } from '../interface/like.interface'

export class CreateLikeMapper {
    public toMapper(like:LikeInterface){
        return {
            id : like.id,
            user_id : like.user_id,
            i_liked : like.i_liked,
            publication_id : like.publication_id,
        }
    }
}