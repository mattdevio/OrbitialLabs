/*==========================================
=            Speech Recognition            =
==========================================*/

class Speech {

  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
  }

  static getInstance() {
    if (!Speech.__instance) {
      Speech.__instance = new Speech();
    }
    return Speech.__instance;
  }

}

export default Speech;
