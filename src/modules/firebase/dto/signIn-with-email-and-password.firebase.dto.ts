export class signInWithEmailAndPasswordFirebaseDto {
  public iss: string;
  public aud: string;
  public auth_time: number;
  public user_id: string;
  public sub: string;
  public iat: string;
  public exp: string;
  public email: string;
  public email_verified: boolean;
  public uid: string;
  public firebase: Firebase;
}

class Firebase {
  public identities: {
    email: [];
  };
  public sign_in_provider: string;
}
