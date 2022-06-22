import { Publication, ListPublication, CreatePublication, UpdatePublication } from '@shared/interfaces/publication.interface'

export class PageMapper {

    public privateList(field: ListPublication) {
        return <ListPublication>{
            res:field.res.filter((f)=> {
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }

    public publicList(field: ListPublication) {
        return <ListPublication>{
            res:field.res.filter((f)=> {
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }

    public create(field: Publication) {
        return <Publication[]>[{
            id: field.id,
            text: field.text,
            number_of_likes: field.number_of_likes,
            number_of_comments: field.number_of_comments,
            page_id: field.page_id,
            user_id: field.user_id,
            timestamp: field.timestamp
        }]
    }

    public publicFindOne(field: Publication) {
        return [{
            id: field.id,
            text: field.text,
            number_of_likes: field.number_of_likes,
            number_of_comments: field.number_of_comments,
            page_id: field.page_id,
            user_id: field.user_id,
            timestamp: field.timestamp
        }]
    }

    public privateFindOne(field: Publication) {
        return [{
            id: field.id,
            text: field.text,
            number_of_likes: field.number_of_likes,
            number_of_comments: field.number_of_comments,
            page_id: field.page_id,
            user_id: field.user_id,
            timestamp: field.timestamp
        }]
    }
      
}