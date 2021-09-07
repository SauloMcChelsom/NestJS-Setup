class Login {

  constructor() {
    error.style.display = 'none';
    signInLoading.style.display = 'none';
    this.isLogged()
  }

  signInWithEmailAndPassword() {
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    const email = emailField.value;
    const password = passwordField.value;

    signInLoading.style.display = ''
    signInBtn.style.display = 'none';
  
    firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
      window.location.href = "/auth/home";
    })
    .catch((err) => {
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
      error.style.display = 'block';
      error.innerHTML = err.message;
    });
  }
  
  async authenticationByGoogle() {
    return await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) => {
      window.location.href = "/auth/home";
    })
    .catch((err) => {
      signInBtn.style.display = ''
      signInLoading.style.display = 'none';
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

let _ = new Login();
