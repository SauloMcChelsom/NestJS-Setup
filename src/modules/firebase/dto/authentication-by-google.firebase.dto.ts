export class authenticationByGoogleFirebaseDto {
    public uid: string
    public email: string
    public emailVerified: boolean
    public displayName: string
    public photoURL: string
    public disabled: boolean
    public tokensValidAfterTime: string
    public metadata: Metadata
    public providerData: ProviderData[]
  }
  
  class Metadata {
    public lastSignInTime: string
    public creationTime: string
  }

  class ProviderData {
    public uid: string
    public displayName: string
    public email: string
    public photoURL: string
    public providerId: string
  }