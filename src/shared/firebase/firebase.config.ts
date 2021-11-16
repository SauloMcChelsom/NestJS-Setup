import * as firebase from 'firebase-admin';
import { serviceAccounts } from './env.FIREBASE';

export function initializeFirebase() {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccounts),
    });
}