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

      let {statusCode, is_active } = await this.checkUserExistsByEmail(user.email)
     
      if(statusCode == 200 && !is_active){
        await this.activeAccount(user.uid)
      }

      if(statusCode == 200){
        await this.signInLocalWithUidAndTokenOfGoogleAuthProvider(user.uid, user.Aa)
        lottie.style.display = '';
        awaits.style.display = 'none';
        const player = document.querySelector("lottie-player");
        player.load("https://assets3.lottiefiles.com/packages/lf20_tszzqucf.json");
        setTimeout(()=>{
          this.goHome()
        },5000)//5 segundos
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

      await this.createUserAuthProvider(createUser)

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

  async createUserAuthProvider(user) {
    await fetch('/v1/public/auth/create-new-account-with-google-auth-provider', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) 
    })
    .then(async(res)=>{
      return await res
    }).catch((err) => {
      container.style.display = '';
      awaits.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err.message;
    });
  }

  async checkUserExistsByEmail(email) {
    return await fetch(`/v1/public/user/email/${email}`, { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(async(res)=>{
      let is_active = false
      if(res.statusCode == 200){
        is_active = res.results[0].is_active
      }
      return await { is_active:is_active, statusCode:res.statusCode }
    })
  }

  async activeAccount(uid) {
    return await fetch(`/v1/public/auth/google-auth-provider/active-account/${uid}`, {
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
      container.style.display = '';
      awaits.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err.message;
    });
  }

  async signInLocalWithUidAndTokenOfGoogleAuthProvider(uid, token) {
    return await fetch(`/v1/private/firebase/sign-in-with-token-firebase/${uid}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(async(res)=>{
      await localStorage.setItem('token', JSON.stringify(res))
      return await res
    }).catch((err) => {
      container.style.display = '';
      awaits.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err.message;
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