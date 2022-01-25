class Login {

  constructor() {
    document.title = 'Login';
    container.style.display = '';
    lottie.style.display = 'none';
    this.isLogged()
  }

  goHome(){
    window.location.href = "/home";
  }

  async authenticationByGoogle() {
    container.style.display = 'none';
    awaits.style.display = '';
    
    return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async({user}) => {

      let {ok, statusCode, error:_error, message:unknown_message  } = await this.checkUserExistsByEmail(user.email)

      if(statusCode == 200){
        lottie.style.display = '';
        awaits.style.display = 'none';

        let firebase_uid = user.uid
        let nestjs_uid = ok.results[0].uid
  
        if(firebase_uid != nestjs_uid){
          this.updateUserUidWithFirebaseUid(nestjs_uid, firebase_uid, user.Aa)
        }

        const player = document.querySelector("lottie-player");
        player.load("https://assets3.lottiefiles.com/packages/lf20_tszzqucf.json");
        
        setTimeout(()=>{
          this.goHome()
        },5000)//5 segundos
        return
      }

      if(statusCode == 404 && unknown_message){
        error.style.display = 'block';
        error.innerHTML = _error.message || `error: ${_error} >--x--< message: ${unknown_message}`;
        return
      }

      function dec2hex (dec) {
        return dec.toString(16).padStart(2, "0")
      }
      
      function generateId (len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, dec2hex).join('')
      }

      const createUser = {
        "uid" : user.uid,
        "name" : this.cutString(user.email,'@'),
        "email": user.email,
        "password": generateId(10),//ex.: f539241c7b
        "providers":"google.com"
      }

      await this.createUserDataBase(createUser)

      lottie.style.display = '';
      awaits.style.display = 'none';

      const player = document.querySelector("lottie-player");
      player.load("https://assets3.lottiefiles.com/packages/lf20_tszzqucf.json");

      setTimeout(()=>{
        this.goHome()
      },5500)//5 segundos

    })
    .catch((err) => {
      container.style.display = '';
      awaits.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err.message;
    });
  }

  async createUserDataBase(user) {
    await fetch('/user/public/', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) 
    })
    .then(async(res) => await res.json())
    .then(async(res)=>{
      await res
      if(res.statusCode == 200){
        return res
      }else{
        const user = firebase.auth().currentUser;
        user.delete();
        error.style.display = 'block';
        error.innerHTML = res.error.message;
      }
    }).catch((err) => {
      error.style.display = 'block';
      error.innerHTML = err;
    });
  }

  async checkUserExistsByEmail(email) {
    return await fetch(`/v1/user/public/email/${email}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(async(res)=>{
      return await res
    }).catch((err) => {
      error.style.display = 'block';
      error.innerHTML = err;
    });
  }

  async updateUserUidWithFirebaseUid(userUid, firebaseUid, token) {

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userUid: userUid,  firebaseUid:firebaseUid})
    };

    return await fetch(`/v1/user/auth/uid`, requestOptions)
    .then(res => res.json())
    .then(async(res)=>{
      return await res
    }).catch((err) => {
      error.style.display = 'block';
      error.innerHTML = err;
    });
  }

  cutString(str, cut){
    const text = str;
    return text.slice(0, str.lastIndexOf(cut));
  }

  async isLogged() {
    await firebase.auth().onAuthStateChanged((res) => {
      if(res){
        setTimeout(()=>{
          this.goHome()
        },5000)//5 segundos
      }else{
        awaits.style.display = 'none';
        container.style.display = '';
      }
    });
  }
  
}

let _ = new Login();