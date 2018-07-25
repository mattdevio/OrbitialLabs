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

  static getInstance() {
    if (!Storage.__instance) {
      Storage.__instance = new Storage();
    }
    return Storage.__instance;
  }

  setToken(token) {
    if (this.useNoOp) return;
    if (token) {
      localStorage.setItem('TOKEN', token);
    } else {
      localStorage.removeItem(token);
    }
  }

  getToken() {
    if (this.useNoOp) return;
    const token = localStorage.TOKEN ? localStorage.TOKEN : undefined;
    return token;
  }

}

export default Storage;
