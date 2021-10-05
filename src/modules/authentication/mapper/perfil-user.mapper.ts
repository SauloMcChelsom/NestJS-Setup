import { PerfilUserDto } from '../dto'
import { UserEntity } from '@entity/user.entity'

export class PerfilUserMapper extends PerfilUserDto {

  public toDto(user:UserEntity):PerfilUserDto{
    this.uid = user.uid,
    this.name = user?.name;
    this.email = user?.email;
    this.timestamp = user?.timestamp;
    this.providers = user?.providers;

    return {
      email: this.email,
      lastName: '',
      name: this.name,
      providers: this.providers,
      timestamp: this.timestamp,
      uid: this.uid
    }
  }
}





