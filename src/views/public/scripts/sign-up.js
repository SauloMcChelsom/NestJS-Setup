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

      signUpLoading.style.display = ''
      signUpBtn.style.display = 'none';
  
      return firebase.auth().createUserWithEmailAndPassword(email, password).then(async({user}) => {
        const createUser = {
          "uid" : user.uid,
          "name" : this.cutString(email,'@'),
          "email": email,
          "password": password,
          "providers":"email_password"
        }

        await this.createUserDataBase(createUser)

        window.location.href = "/home";
      })
      .catch((err) => {
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;
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
          signUpBtn.style.display = ''
          signUpLoading.style.display = 'none';
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
          user.delete().then(() => {
            signUpBtn.style.display = ''
            signUpLoading.style.display = 'none';
            error.style.display = 'block';
            error.innerHTML = res.error.message;
          })
        }
      }).catch((err) => {
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
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
  