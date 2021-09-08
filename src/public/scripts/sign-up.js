class SignUp {

    constructor() {
      document.title = 'Register';
      error.style.display = 'none';
      signUpLoading.style.display = 'none';
      this.isLogged()
    }
  
    createUserWithEmailAndPassword() {
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
  
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        window.location.href = "/auth/home";
      })
      .catch((err) => {
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;
      });
    }

    async authenticationByGoogle() {
      return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
        window.location.href = "/auth/home";
      })
      .catch((err) => {
        signUpBtn.style.display = ''
        signUpLoading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = err.message;
      });
    }
  
    async isLogged() {
      await firebase.auth().onAuthStateChanged((res) => {
        if(res){
          window.location.href = "/auth/home";
        }
      });
    }
  }
  
  let _ = new SignUp();
  