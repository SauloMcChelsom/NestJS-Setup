import { signInWithEmailAndPasswordFirebaseDto } from '../dto/signIn-with-email-and-password.firebase.dto'
import { authenticationByGoogleFirebaseDto } from '../dto/authentication-by-google.firebase.dto'
import { UserProfileDto } from '../dto/user-profile.dto'

export class CheckUserExistsMapper  extends UserProfileDto{

  public toDto(user:any):UserProfileDto{
    let sign:signInWithEmailAndPasswordFirebaseDto
    let google:authenticationByGoogleFirebaseDto

    if(user.photoURL){
      google = user
      this.email = google.providerData[0].email
      this.providers = google.providerData[0].providerId
      this.photoURL = google.providerData[0].photoURL
      this.displayName = google.providerData[0].displayName
      this.uid = google.uid
    }else{
      sign = user
      this.email = sign.email
      this.providers = 'email_password'
      this.photoURL = ''
      this.displayName = ''
      this.uid = ''
    }

    return {
      email: this.email,
      providers: this.providers,
      photoURL: this.photoURL,
      displayName: this.displayName,
      uid: ''
    }
  }
}