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

      if(password.length < 6){
        error.style.display = 'block';
        error.innerHTML = "Password should be at least 6 characters"
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
          "providers":"google.email.com"
        }

        await this.createUserLocal(createUser)

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

        let { statusCode } = await this.checkUserExistsByEmail(user.email)

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
          "providers":"google.popup.com"
        }
  
        await this.createUserLocal(createUser)
  
        window.location.href = "/home";
      
      })
      .catch((err) => {
        container.style.display = '';
        awaits.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;
      });
    }

    async createUserLocal(user) {
      await fetch('/v1/public/auth/create-new-google-auth-provider', {
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
  