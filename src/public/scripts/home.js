class Home {

    constructor() {
      document.title = 'Home';
      container.style.display = 'none';
      nav.style.display = 'none';
      loading.classList.add("hidden");
      this.isLogged()
    }
  
    async isLogged() {
      await firebase.auth().onAuthStateChanged((res) => {
        if(res){
          uid.innerHTML = res.uid
          token.innerHTML = res.Aa
          container.style.display = '';
          nav.style.display = '';
          await.style.display = 'none';
        }else{
          window.location.href = "/firebase/page/sign-in";
        }
      });
    }

    async logout() {
      confirmText.classList.add("hidden");
      loading.classList.remove("hidden");
      await firebase.auth().onAuthStateChanged(async(res) => {
        if(res.uid){
          await this.revokeRefreshTokens(res.Aa)
          await firebase.auth().signOut();
          await this.isLogged()
        }
      });
    }
  
    async revokeRefreshTokens(token) {
      return await fetch('/firebase/auth/revoke-refresh-token', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    }
  }
  
  let _ = new Home();