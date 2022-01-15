class SignIn {

  constructor() {
    document.title = 'Login';
    container.style.display = 'none';
    error.style.display = 'none';
    signInLoading.style.display = 'none';
    showAlertLoginWithGoogle.style.display = 'none';
    this.isLogged()
  }

  signInWithEmailAndPassword() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInLoading.style.display = ''
    signInBtn.style.display = 'none';

    firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {

      window.location.href = "/home";

    })
    .catch(async(err) => {
      let {statusCode, ok, error:_error, message:unknown_message  }  = await this.checkIfUserExistsFaribase(email);

      if(statusCode == 404){
        signInBtn.style.display = ''
        signInLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = _error.message || `error: ${_error} >--x--< message: ${unknown_message}`;
        return
      }

      let userExists = ok.results[0]

      if(userExists.providers == "google.com"){        
        const nomeUser = userExists.displayName
        const textCut = nomeUser.slice(0, nomeUser.lastIndexOf(" "));
        alertLoginWithGoogle.innerHTML = `Olá ${textCut}, você não criou sua conta com email e senha, você fez o registro usando uma conta do Google, você reconheçe esta conta abaixa? se sim é só clicar no botão Fazer login com o Google.`;
        document.getElementById("imgAccountGoogle").src = userExists.photoURL;
        nameAccountGoogle.innerHTML = userExists.displayName
        emailAccountGoogle.innerHTML = userExists.email
        setTimeout(()=>{
          showAlertLoginWithGoogle.style.display = ''
          loginForm.style.display = 'none'
          signInBtn.style.display = ''
          signInLoading.style.display = 'none';
        },1000)
      }else{
        signInBtn.style.display = ''
        signInLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;
      }
    });
  }

  async authenticationByGoogle() {
    container.style.display = 'none';
    awaits.style.display = '';
    
    return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async({user}) => {

      let {statusCode, error:_error, message:unknown_message  } = await this.checkUserExistsByEmail(user.email)

      if(statusCode == 200){
        window.location.href = "/home";
        return
      }

      if(statusCode == 404 && unknown_message){
        signInBtn.style.display = ''
        signInLoading.style.display = 'none';
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

      window.location.href = "/home";
      
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
        signInBtn.style.display = '';
        signInLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = res.error.message;
      }
    }).catch((err) => {
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err;
    });
  }

  async checkIfUserExistsFaribase(email) {
    return await fetch(`/firebase/public/user-display-by-email/${email}`, {
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
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err;
    });
  }

  async checkUserExistsByEmail(email) {
    return await fetch(`/user/public/email/${email}`, {
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
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
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
         window.location.href = "/home";
        },5000)//5 segundos
      }else{
        container.style.display = '';
        awaits.style.display = 'none';
      }
    });
  }

  notRecognizeAccount(){
    container.style.display = 'none';
    awaits.style.display = '';
    setTimeout(()=>{
      container.style.display = '';
      awaits.style.display = 'none';
      showAlertLoginWithGoogle.style.display = 'none'
      loginForm.style.display = ''
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'none';
      error.innerHTML = '';
    },1000)//1 segundos
  }
}

let _ = new SignIn();