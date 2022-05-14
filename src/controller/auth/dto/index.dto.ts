import { MinLength, IsString, IsEmail, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
import { CreateUser } from 'src/shared/interfaces/auth.interface';

export class CreateUserDTO  implements CreateUser {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @IsEmail() 
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}

export class CreateUserGoogleProviderDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    uid: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @IsEmail() 
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    providers:string;
}



export class RefreshTokenDTO {
    @IsNotEmpty()
    @IsUUID()
    refresh_token:string
}

export class UserDTO {
    @IsNotEmpty()
    @IsEmail() 
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}