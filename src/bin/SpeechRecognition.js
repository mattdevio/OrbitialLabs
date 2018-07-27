/*==========================================
=            Speech Recognition            =
==========================================*/

class Speech {

  constructor() {
    try { 
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
    } catch (e) {
      console.log(e);
    }
  }

  static getInstance() {
    if (!Speech.__instance) {
      Speech.__instance = new Speech();
    }
    return Speech.__instance;
  }

}

export default Speech;
