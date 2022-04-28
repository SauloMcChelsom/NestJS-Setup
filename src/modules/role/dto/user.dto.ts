import { MinLength, IsString, IsNotEmpty } from 'class-validator';
import { Role } from 'src/shared/enum/role.enum';

export class UpdateRoleUserDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    role: Role;
}