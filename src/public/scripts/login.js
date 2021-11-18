class Login {

  constructor() {
    document.title = 'Login';
    container.style.display = '';
    lottie.style.display = 'none';
    this.isLogged()
  }

  async authenticationByGoogle() {
    container.style.display = 'none';
    awaits.style.display = '';
    
    return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async({user}) => {

      let {statusCode, error:_error, message:unknown_message  } = await this.checkUserExistsByEmail(user.email)

      if(statusCode == 200){
        lottie.style.display = '';
        awaits.style.display = 'none';

        const player = document.querySelector("lottie-player");
        player.load("https://assets3.lottiefiles.com/packages/lf20_tszzqucf.json");
        
        setTimeout(()=>{
          window.location.href = "/firebase/page/auth/home";
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
        window.location.href = "/firebase/page/auth/home";
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
    await fetch('/user', {
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
    return await fetch(`/user/check-user-exists-by-email/${email}`, {
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

  cutString(str, cut){
    const text = str;
    return text.slice(0, str.lastIndexOf(cut));
  }

  async isLogged() {
    await firebase.auth().onAuthStateChanged((res) => {
      if(res){
        setTimeout(()=>{
         window.location.href = "/firebase/page/auth/home";
        },5000)//5 segundos
      }else{
        awaits.style.display = 'none';
        container.style.display = '';
      }
    });
  }
  
}

let _ = new Login();