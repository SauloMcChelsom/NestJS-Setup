var firebaseConfig = {
    apiKey: "AIzaSyC7bzUIjrIHIdAhRyRm1GRWBmAR3Wr2CZA",
    authDomain: "educando-brasil.firebaseapp.com",
    projectId: "educando-brasil",
    storageBucket: "educando-brasil.appspot.com",
    messagingSenderId: "42631077323",
    appId: "1:42631077323:web:a3a48aa55ae0daf0cd6a4e",
    measurementId: "G-HGLNMW873K"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); 
}