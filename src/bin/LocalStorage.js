/*================================================
=            Local Storage Management            =
================================================*/

class Storage {

  constructor() {
    if (typeof Storage === 'undefined') {
      this.useNoOp = true;
      console.log('This browser doesn\'t have local storage :(');
    }
  }

  getInstance() {
    if (!Storage.__instance) {
      Storage.__instance = new Storage();
    }
    return Storage.__instance;
  }

  setToken(token) {
    if (this.useNoOp) return;
    if (typeof token === 'undefined') {
      localStorage.removeItem('TOKEN');
    } else {
      localStorage.getItem('TOKEN', token);
    }
  }

  getToken() {
    if (this.useNoOp) return;
    if (localStorage.TOKEN) {
      return localStorage.TOKEN;
    }
  }

}

export default Storage;
