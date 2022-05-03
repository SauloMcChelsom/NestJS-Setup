import { Follow, ListFollow } from '@shared/interfaces/follow.interface'

export class FollowMapper {

    public create(field: Follow) {
        return<Follow[]>[{
          id: field.id,
          user_id: field.user_id,
          page_id: field.page_id,
          i_am_following: field.i_am_following,
          timestamp: field.timestamp,
        }]
    }
      
    public privateList(field: ListFollow) {
        return <ListFollow>{
            res:field.res.filter((f)=> {
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }
}

  