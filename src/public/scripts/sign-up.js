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
  
      return firebase.auth().createUserWithEmailAndPassword(email, password).then(async({user}) => {
        const createUser = {
          "uid" : user.uid,
          "name" : this.cutString(email,'@'),
          "email": email,
          "password": password,
          "providers":"email_password"
        }

        await this.createUserDataBase(createUser, user.Aa,  user.uid)
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

        let userExists = await this.checkIfUserExists(user.email, user.Aa)

        if(userExists.email){
          //window.location.href = "/firebase/page/auth/home";
        }else{

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
            "nome" : this.cutString(user.email,'@'),
            "email": user.email,
            "senha": generateId(10),
            "providers":"google"
          }

          await this.createUserDataBase(createUser, user.Aa, user.uid)
        }
      })
      .catch((err) => {
        container.style.display = '';
        awaits.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;
      });
    }

    async createUserDataBase(user, token, uid) {
      await fetch('/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user) 
      })
      .then(res => res.json())
      .then((res)=>{
        console.log(res)
        if(res.statusCode == 200){
          console.log('cadastro com sucesso')
          window.location.href = "/firebase/page/auth/home";
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

    async checkIfUserExists(email, token) {
      return await fetch(`/usuarios/check-if-user-exists/${email}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(res => res.json())
      .then(async(res)=>{
        return await res
      }).catch((err) => {
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
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
            window.location.href = "/firebase/page/auth/home";
          },5000)//5 segundos
        }else{
          container.style.display = '';
          awaits.style.display = 'none';
        }
      });
    }

  }
  
  let _ = new SignUp();
  