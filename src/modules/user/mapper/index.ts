import { User } from '@shared/interfaces/user.interface'

export class UserMapper {

    public privateFindOne(field: User) {
        return [{
            id: field.id,
            uid: field.uid,
            name: field.name,
            email: field.email,
            providers: field.providers,
            timestamp: field.timestamp?.toString()
        }]
    }

    public publicFindOne(field: User) {
        return [{
            id: field.id,
            uid: field.uid,
            name: field.name,
            email: field.email,
            providers: field.providers,
            timestamp: field.timestamp?.toString()
        }]
    }

    public update(field: User) {
        return [{
            id: field.id,
            uid: field.uid,
            name: field.name,
            email: field.email,
            providers: field.providers,
            timestamp: field.timestamp?.toString()
        }]
    }

}