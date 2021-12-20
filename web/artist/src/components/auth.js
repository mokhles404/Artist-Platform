

class Auth {
    constructor(props) {

      if (localStorage.getItem("loginstate")) 
      this.authenticated=JSON.parse(localStorage.getItem("loginstate"));
      else
      this.authenticated = false;
    }
    
    login(cb) {
      this.authenticated = true;
      cb();
    }
  
    logout(cb) {
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();
  