class SignUp {

    constructor() {
      document.title = 'Register';
      container.style.display = 'none';
      error.style.display = 'none';
      signUpLoading.style.display = 'none';
      this.isLogged()
    }
  
    async createUserWithEmailAndPassword() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const repeatPassword = document.getElementById('repeatpassword').value;

      if(password != repeatPassword){
        error.style.display = 'block';
        error.innerHTML = "Passwords don't match"
        return
      }

      if(password.length < 8){
        error.style.display = 'block';
        error.innerHTML = "Password should be at least 8 characters"
        return
      }

      let { statusCode } = await this.checkUserExistsByEmail(email)

      if(statusCode == 200){
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = `The email address is already | local`;
        return
      }

      signUpLoading.style.display = ''
      signUpBtn.style.display = 'none';

      return firebase.auth().createUserWithEmailAndPassword(email, password).then(async({user}) => {
        const createUser = {
          "uid" : user.uid,
          "name" : this.cutString(email,'@'),
          "email": email,
          "password": password,
          "providers":"local.google.com"
        }

        await this.createUserEmailPassword(createUser)
        await this.localEmailAndPassword(email, password)
        window.location.href = "/home";
      })
      .catch((err) => {
        let message = err.message;
        if(err.code == 'auth/email-already-in-use'){
          message = 'The email address is already | google'
        }
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = message
      });
    }

    async authenticationByGoogle() {
      container.style.display = 'none';
      awaits.style.display = '';
      
      return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async({user}) => {

        let { statusCode,  is_active } = await this.checkUserExistsByEmail(user.email)

        if(statusCode == 200 && !is_active){
          await this.activeAccount(user.uid)
        }

        if(statusCode == 200 && providers == 'google.com'){
          await this.signInLocalWithUidAndTokenOfGoogleAuthProvider(user.uid, user.Aa)
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
        await this.signInLocalWithUidAndTokenOfGoogleAuthProvider(user.uid, user.Aa)
        window.location.href = "/home";
      
      })
      .catch((err) => {
        container.style.display = '';
        awaits.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;
      });
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

    async createUserEmailPassword(user) {
      await fetch('/v1/public/auth/create-new-account-with-google-email-password', {
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
        signInBtn.style.display = ''
        signInLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err;
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

    isLogged() {
      firebase.auth().onAuthStateChanged((res) => {
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

  }
  
  let _ = new SignUp();
  