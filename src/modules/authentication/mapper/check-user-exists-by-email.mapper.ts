import { CheckUserExistsByEmailDto } from '../dto'
import { UserEntity } from '@entity/user.entity'

export class CheckUserExistsByEmailMapper  extends CheckUserExistsByEmailDto{

  public toDto(user:UserEntity):CheckUserExistsByEmailDto{
    this.email = user?.email;
    this.providers = user?.providers;

    return {
      email: this.email,
      providers: this.providers
    }
  }
}