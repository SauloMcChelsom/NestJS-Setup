import { Page, ListPage, CreatePage, UpdatePage } from '@shared/interfaces/page.interface'

export class PageMapper {

    public privateFindOne(field: Page) {
        return [{
            id: field.id,
            user_id: field.user_id,
            page_name: field.page_name,
            page_description: field.page_description,
            number_of_followers: field.number_of_followers,
            timestamp: field.timestamp
        }]
    }

    public privateList(field: ListPage) {
        return <ListPage>{
            res:field.res.filter((f)=> {
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }

    public publicList(field: ListPage) {
        return <ListPage>{
            res:field.res.filter((f)=> {
                f.timestamp.toString()
                return f
            }),
            count:field.count
        }
    }

    public create(field: Page) {
        return [{
            id: field.id,
            user_id: field.user_id,
            page_name: field.page_name,
            page_description: field.page_description,
            number_of_followers: field.number_of_followers,
            timestamp: field.timestamp?.toString(),
        }]
    }

    public publicFindOne(field: Page) {
        return [{
            id: field.id,
            user_id: field.user_id,
            page_name: field.page_name,
            page_description: field.page_description,
            number_of_followers: field.number_of_followers,
            timestamp: field.timestamp?.toString(),
        }]
    }
      
}