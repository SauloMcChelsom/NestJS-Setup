class SignIn {

  constructor() {
    document.title = 'Login';
    container.style.display = 'none';
    error.style.display = 'none';
    signInLoading.style.display = 'none';
    showAlertLoginWithGoogle.style.display = 'none';
    this.isLogged()
  } 

  async signInWithEmailAndPassword() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInLoading.style.display = ''
    signInBtn.style.display = 'none';

    //vefificar se esta cadastrado jwt local
    let { statusCode, providers } =  await this.checkUserExistsByEmail(email)

    if(statusCode == 404){
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = `Email <b>${email}</b> não encontrado!`
      return
    }     

    if(statusCode == 200){
      let providersIsValid = false

      //usuario cadastrado com o providers do google
      if(providers == "local.com"){ 
        providersIsValid = true
        await this.localEmailAndPassword(email, password)
      }

      if(providers == "local.google.com" || providers == "google.com" ){ 
        providersIsValid = true
        this.providersGoogleEmailAndPassword(email, password)
      }

      if(providersIsValid == false){ 
        signInBtn.style.display = ''
        signInLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = `Provedor não existe`
        return
      }
    } 

    if(![200, 404].includes(statusCode)){
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = `Error inesperado`
      return
    }
  }

  async providersGoogleEmailAndPassword(email, password){
    //verificar se esta cadastrado no firebase
    await firebase.auth().signInWithEmailAndPassword(email, password).then(async({ user }) => {
      await this.localEmailAndPassword(email, password)
      window.location.href = "/home"
    }).catch(async(err) => {
      let {statusCode, results, message  }  = await this.checkIfUserExistsFaribase(email);

      //não existe esse usuario no firebase
      if(statusCode == 404){
        signInBtn.style.display = ''
        signInLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = message;
        if(message == 'auth/user-not-found'){
          error.innerHTML = 'Usuario não cadastrado';
        }
        return
      }

      //existe esse usuario no firebase, mas não foi cadastrado com email/password
      let userExists = results[0]

      //usuario cadastrado com o providers do google
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
        //um outro providers ou um erro de 'providers'
        signInBtn.style.display = ''
        signInLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;

        if(err.code == 'auth/too-many-requests'){
          signInBtn.style.display = ''
          signInLoading.style.display = 'none';
          error.style.display = 'block';
          error.innerHTML = message;
          error.innerHTML = 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login com falha. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.';
          return
        }
  
        if(err.code == 'auth/wrong-password'){
          signInBtn.style.display = ''
          signInLoading.style.display = 'none';
          error.style.display = 'block';
          error.innerHTML = message;
          error.innerHTML = 'Senha incorreta!';
          return
        }
      }
    })
  }

  async localEmailAndPassword(email, password){
    await this.signInWithEmailAndPasswordJwtLocal(email, password)
    .then(async res => await res.json())
    .then(async(res)=>{
      if (!res.access_token) {
        throw res
      }
      await localStorage.setItem('token', JSON.stringify(res))
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'none';
      alertSuccess.innerHTML = 'Login Realizado com sucesso';
      alertSuccess.style.display = 'block';
      window.location.href = "/home"
      return await res
    }).catch(async(err) => {
      if(err.code == "different_password"){
        error.innerHTML = 'Senha incorreta!';
      }
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'block';

      alertSuccess.innerHTML = '';
      alertSuccess.style.display = 'none';
    });
  }

  /**
   * 
   */

  async authenticationByGoogle() {
    container.style.display = 'none';
    awaits.style.display = '';
    
    return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async({user}) => {

      let {statusCode, is_active } = await this.checkUserExistsByEmail(user.email)
      
      if(statusCode == 200 && !is_active){
        await this.activeAccount(user.uid)
      }

      if(statusCode == 200){
        window.location.href = "/home";
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

      window.location.href = "/home";
      
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
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err;
    });
  }

  async checkIfUserExistsFaribase(email) {
    return await fetch(`/v1/public/firebase/user-display-by-email/${email}`, {
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
      let providers = null
      if(res.statusCode == 200){
        is_active = res.results[0].is_active
        providers = res.results[0].providers
      }
      return await { is_active:is_active, statusCode:res.statusCode, providers:providers }
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
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err;
    });
  }

  async signInWithEmailAndPasswordJwtLocal(email, password) {
    return await fetch(`/v1/public/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'user_agent': window.navigator.userAgent,
        'window_screen_width': screen.width,
        'window_screen_height': screen.height,
        'window_screen_color_depth': screen.colorDepth,
        'window_screen_pixel_depth': screen.pixelDepth,
      },
      body: JSON.stringify({
        email:email,
        password:password
      }) 
    })
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