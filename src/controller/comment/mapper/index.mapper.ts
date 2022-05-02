import { Comment, ListComment } from '@shared/interfaces/comment.interface'

export class CommentMapper {

    public privateFindOne(field: Comment) {
        return [{
            id: field.id,
            user_id: field.user_id,
            publication_id: field.publication_id,
            comment: field.comment,
            timestamp: field.timestamp?.toString()
        }]
    }

    public publicFindOne(field: Comment) {
        return [{
            id: field.id,
            user_id: field.user_id,
            publication_id: field.publication_id,
            comment: field.comment,
            timestamp: field.timestamp.toString(),
        }]
    }

    public privateList(field: ListComment) {
        return <ListComment>{
            res:field.res.filter((f)=> {
                //delete f.user_id,
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }

    public publicList(field: ListComment) {
        return <ListComment>{
            res:field.res.filter((f)=> {
                //delete f.user_id,
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }

    public publicListCommentByUserId(field: Comment) {
        return {
            comment: field.comment,
            timestamp: field.timestamp.toString()
        }
    }

    public create(field: Comment) {
        return [{
            id: field.id,
            user_id: field.user_id,
            publication_id: field.publication_id,
            comment: field.comment,
            timestamp: field.timestamp?.toString()
        }]
    }

    public update(field: Comment) {
        return [{
            id: field.id,
            user_id: field.user_id,
            publication_id: field.publication_id,
            comment: field.comment,
            timestamp: field.timestamp?.toString()
        }]
    }

}