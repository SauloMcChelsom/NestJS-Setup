import * as firebase from 'firebase-admin';
import { serviceAccount } from './service-account';

export class InitializeFirebase {
    constructor(){
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
        })
    }
}