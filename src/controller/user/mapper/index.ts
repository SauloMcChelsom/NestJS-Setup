import { User } from '@shared/interfaces/user.interface'

export class UserMapper {

    public privateFindOne(field: User) {
        return [{
            id: field.id,
            uid: field.uid,
            name: field.name,
            email: field.email,
            role:field.role,
            providers: field.providers,
            last_login: field.last_login,
            is_active: field.is_active,
            updated_at: field.updated_at,
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
            last_login: field.last_login,
            is_active: field.is_active,
            updated_at: field.updated_at,
            timestamp: field.timestamp?.toString()
        }]
    }

    public publicList(user: User[]) {
        return <User[]>user.filter(user=> delete user.password)
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