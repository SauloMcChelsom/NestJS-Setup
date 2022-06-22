import { Role } from '../enum/role.enum'

export interface User {
    id?: number;
    uid?: string;
    email?: string;
    name?: string;
    password?: string;
    providers?: string;
    timestamp?: Date;
    role?: Role;
} 