import { UserToken } from '@root/src/shared/interfaces';
import { 
  signInWithEmailAndPasswordFirebase, 
  authenticationByGoogleFirebase, 
  UserProfile
} from '@shared/interfaces/firebase.interface'

import { User } from '../../../shared/interfaces/user.interface'

export class FirebaseMapper extends UserProfile{

  public login(field: UserToken) {
    return <UserToken>field
  }

  public create(field: User) {
    return {
      id: field.id,
      uid: field.uid,
      providers: field.providers,
      email: field.email
    };
  }

  public privateUserProfile(user: any) {
    let sign: signInWithEmailAndPasswordFirebase
    let google: authenticationByGoogleFirebase

    if (user.photoURL) {
      google = user
      this.email = google.providerData[0].email
      this.providers = google.providerData[0].providerId
      this.photoURL = google.providerData[0].photoURL
      this.displayName = google.providerData[0].displayName
      this.uid = google.uid
    } else {
      sign = user
      this.email = sign.email
      this.providers = 'sign_in_with_email_password_by_google'
      this.photoURL = ''
      this.displayName = ''
      this.uid = ''
    }

    return <UserProfile>{
      email: this.email,
      providers: this.providers,
      photoURL: this.photoURL,
      displayName: this.displayName,
      uid: '',
    }
  }
}