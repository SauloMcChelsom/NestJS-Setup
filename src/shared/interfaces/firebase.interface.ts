export class authenticationByGoogleFirebase {
    public uid: string;
    public email: string;
    public emailVerified: boolean;
    public displayName: string;
    public photoURL: string;
    public disabled: boolean;
    public tokensValidAfterTime: string;
    public metadata: Metadata;
    public providerData: ProviderData[];
}

class Metadata {
    public lastSignInTime: string;
    public creationTime: string;
}

class ProviderData {
    public uid: string;
    public displayName: string;
    public email: string;
    public photoURL: string;
    public providerId: string;
}

export class signInWithEmailAndPasswordFirebase {
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

export class UserProfile {
    public email: string;
    public providers: string;
    public photoURL: string;
    public displayName: string;
    public uid: string;
}

