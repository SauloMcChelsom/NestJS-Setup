export interface Ok {
    results:object
    size?:number
}

export interface Infor {
    timestamp?: Date
    message: string
    code: string
    description?: string
    path?: string
    method?: string
}

export interface Error {
    timestamp?: Date
    message: string
    code: string
    description?: string
    path?: string
    method?: string
}