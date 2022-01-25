import * as firebase from 'firebase-admin';
import { serviceAccount } from './service-account';
export function initializeFirebase() {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
    })
}