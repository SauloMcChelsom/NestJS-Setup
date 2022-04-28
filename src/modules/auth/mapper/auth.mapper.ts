import { UserToken, AccessToken } from '../../../shared/interfaces/auth.interface';
import { User } from '../../../shared/interfaces/user.interface';

export class AuthMapper {

  public create(field: User) {
    return {
      id: field.id,
      uid: field.uid,
      providers: field.providers,
      email: field.email
    };
  }

  public login(field: UserToken) {
    return <UserToken>field
  }

  public refreshToken(token: string) {
    return <AccessToken>{
      access_token: token
    }
  }

  public revokeToken() {
    return {
      revokeToken: true
    }
  }

}