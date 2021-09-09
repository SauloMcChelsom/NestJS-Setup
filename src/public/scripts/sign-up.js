class SignUp {

    constructor() {
      document.title = 'Register';
      container.style.display = 'none';
      error.style.display = 'none';
      signUpLoading.style.display = 'none';
      this.isLogged()
    }
  
    async createUserWithEmailAndPassword() {
      const emailField = document.getElementById('email');
      const passwordField = document.getElementById('password');
      const repeatPasswordField = document.getElementById('repeatpassword');
  
      const email = emailField.value;
      const password = passwordField.value;
      const repeatPassword = repeatPasswordField.value;

      if(password != repeatPassword){
        error.style.display = 'block';
        error.innerHTML = "Passwords don't match"
        return
      }

      signUpLoading.style.display = ''
      signUpBtn.style.display = 'none';
  
      return firebase.auth().createUserWithEmailAndPassword(email, password).then(async(user) => {
        const createUser = {
          "uiid" : user.uid,
          "nome" : this.cutString(email,'@'),
          "email": email,
          "senha": password//this.generateId(10)
        }
        await this.createUserDataBase(createUser, user.Aa)
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
      
      return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async(user) => {

        let userExists = await this.checkIfUserExists(user.email, user.Aa)

        if(userExists.email){
          window.location.href = "/auth/home";
        }else{
          const createUser = {
            "uiid" : user.uid,
            "nome" : this.cutString(user.email,'@'),
            "email": user.email,
            "senha": this.generateId(10)
          }
          await this.createUserDataBase(createUser, user.Aa)
        }

      })
      .catch((err) => {
        container.style.display = '';
        awaits.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;
      });
    }
  
    async isLogged() {
      await firebase.auth().onAuthStateChanged((res) => {
        if(res){
          window.location.href = "/auth/home";
        }else{
          container.style.display = '';
          awaits.style.display = 'none';
        }
      });
    }

    async createUserDataBase(user, token) {
      await fetch('/usuarios', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user) 
      }).then((res)=>{
        window.location.href = "/auth/home";
      }).catch((err) => {
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err;
      });
    }

    async checkIfUserExists(email, token) {
      return await fetch(`/usuarios/check-if-user-exists/${email}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }).then(async(res)=>{
        return res
      }).catch((err) => {
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err;
      });
    }

    dec2hex (dec) {
      return dec.toString(16).padStart(2, "0")
    }
    
    generateId (len) {
      var arr = new Uint8Array((len || 40) / 2)
      window.crypto.getRandomValues(arr)
      return Array.from(arr, dec2hex).join('')
    }

    cutString(str, cut){
      const text = str;
      return text.slice(0, str.lastIndexOf(cut));
    }

  }
  
  let _ = new SignUp();
  