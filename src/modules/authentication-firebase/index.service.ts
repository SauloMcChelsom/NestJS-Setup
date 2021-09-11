import { Injectable } from '@nestjs/common'
import * as firebase from 'firebase-admin';
var serviceAccount = require("./firebase.config.json");

@Injectable()
export class IndexService {

  private admin: any;

  constructor() {
    this.admin = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });
  }

  public async verifyIdToken(token) {
    return await firebase.auth().verifyIdToken(token, true).then(async(decodedToken) => {
      return await decodedToken
    })
    .catch((error) => {
      return { message:'Error verify id  token', error:error }
    });
  }

  public async revokeRefreshTokens(token) {
    return await firebase.auth().verifyIdToken(token, true).then(async(decodedToken) => {
      return await firebase.auth().revokeRefreshTokens(decodedToken.uid).then(()=>{
        return {message:"sucess", code:200}
      }).catch((error) => {
        return { message:'Error revogar token', error:error }
      });
    })
    .catch((error) => {
      return { message:'Error verify id  token', error:error }
    });
  }

  public async createCustomToken(uid) {
    const userId = uid;
    const additionalClaims = {
      premiumAccount: true,
      nomeUsuario: 'saulo'
    };

    return await firebase.auth().createCustomToken(userId, additionalClaims)
    .then(async(customToken) => {
      return await customToken
    })
    .catch((error) => {
      return { message:'Error creating custom token', error:error }
    });
  }

  public async getUser(uid) {
    return await firebase.auth().getUser(uid)
    .then(async(userRecord) => {
      return await{ message:'Successfully fetched user data', response:userRecord.toJSON() }
    })
    .catch((error) => {
      return { message:'Error fetching user data', error:error }
    });
  }

  public async getUserByEmail(email) {
    return await firebase.auth().getUserByEmail(email)
    .then(async(userRecord) => {
      return await { response:userRecord.toJSON() }
    })
    .catch((error) => {
      return { message:'Error fetching user data', error:error }
    });
  } 
  
  public async createUser(data){
    return await firebase.auth().createUser({
      email: 'maeli@gmail.com',
      emailVerified: false,
      password: '203327',
     /* phoneNumber: '+11234567890',
      displayName: 'John Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',*/
      disabled: false,
    })
    .then(async(userRecord) => {
      return await { message:'Successfully created new user', response:userRecord }
    })
    .catch((error) => {
      return { message:'Error creating new user', error:error }
    });
  }

  public async updateUser(uid) {
    return await firebase.auth().updateUser(uid, {
      email: 'modifiedUser@example.com',
      phoneNumber: '+11234567890',
      emailVerified: true,
      password: 'newPassword',
      displayName: 'Jane Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: true,
    })
    .then(async(userRecord) => {
      return await { message:'Successfully updated user', response:userRecord.toJSON() }
    })
    .catch((error) => {
      return { message:'Error updating user:', error:error }
    });
  }

  public async deleteUser(uid) {
    return await firebase.auth().deleteUser(uid)
    .then(async() => {
      return await { message:'Successfully deleted user' }
    })
    .catch((error) => {
      console.log('Error deleting user', error);
      return { message:'Error deleting user', error:error }
    });
  }

}

