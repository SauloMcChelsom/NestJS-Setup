export interface UserToken {
    access_token: string,
    refresh_token:RefreshToken
}

export interface AccessToken {
    access_token: string
}

export interface RefreshToken {
    id: number;
    token: string;
    expires_in: string;
    timestamp: Date;
    user_id: number;
}

export interface CreateUser {
    name: string;
    email: string;
    password: string;
}

export interface CreateUserGoogleProvider {
    uid : string;
    name : string;
    email: string;
    password: string;
    providers:string;
}

export interface CreateUserFirebase {
    uid : string,
    name : string,
    providers : string,
    email : string,
    password : string,
}

export interface UserMachineProperty {
    id?: number;
    user_agent?: string;
    window_screen_width?: string;
    window_screen_height?: string;
    window_screen_color_depth?: string;
    window_screen_pixel_depth?: string;
    timestamp?: Date;
    user_id?: number;
}