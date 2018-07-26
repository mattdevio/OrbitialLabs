/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// --- Speech Recognition ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

/*=========================================
 =           New Message Component         =
 =========================================*/

class NewMessage extends Component {

  constructor(props) {

    super(props);
    this.state = {
      message: '',
      isRecording: false,
      image: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMicrophone = this.handleMicrophone.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();
  }

  handleImageSubmit(event) {

    event.preventDefault();
  }

  handleMicrophone() {

    const self = this;
    const {
        message,
        isRecording,
    } = this.state;

    if (!isRecording) {

      // start recording
      recognition.start();

      // record start
      recognition.onstart = () => self.setState({ isRecording: true });

      // record end
      recognition.onspeechend = () => self.setState({ isRecording: false });

      // record error
      recognition.onerror = (event) => {
        if (event.error === 'no-speech') self.setState({ isRecording: false });
      };

      // record result
      recognition.onresult = (event) => {

        // captured response
        const index = event.resultIndex;
        const transcript = event.results[index][0].transcript;

        // error handler for some mobile devices
        const repeat = (index === 1 && transcript === event.results[0][0].transcript);

        // update message
        if (!repeat) self.setState({ message: `${message} ${transcript}` });
      };

    } else {

      // stop recording
      recognition.stop();
      this.setState({ isRecording: false });
    }
  }

  handleMessage(event) {
    this.setState({ message: event.target.value });
  }

  handleImage(event) {
    this.setState({ image: event.target.value });
  }

  render() {

    const {
        message,
        isRecording,
    } = this.state;

    return (
        <NewMessageContainer>
          <SpeechToTextContainer>
            <StyledFontAwesomeIcon
                icon={ isRecording ? 'circle-notch' : 'microphone' }
                recording={ isRecording.toString() }
                onClick={ this.handleMicrophone }
            />
          </SpeechToTextContainer>
          <NewMessageForm onSubmit={this.handleSubmit}>
            <MessageInput type='text' placeholder='Type something...' value={message} onChange={this.handleMessage} />
            <MessageSubmit type='submit' value='ADD MESSAGE' />
          </NewMessageForm>
          <GiphyForm onSubmit={this.handleImageSubmit}>
            <GiphyInput type='text' placeholder='Search an Image' value={this.image} onChange={this.handleImage}/>
            <GiphySubmit type='submit' value="Add Image" />
          </GiphyForm>
        </NewMessageContainer>
    );
  }
}

export default NewMessage;

/*=====  End of New Message Component  ======*/

const NewMessageContainer = styled.article`
  border-radius: 10px 10px 0 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  display: flex;
  height: 60px;
`;

const SpeechToTextContainer = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 80px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${props => props.recording === 'true' ? '#FF6077' : '#b4b4b4'};
  font-size: 26px;
  cursor: pointer;
`;

const NewMessageForm = styled.form`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
`;

const MessageInput = styled.input`
  border: 0;
  color: #8e8e8e;
  font-size: 14px;
  letter-spacing: 0.5px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const MessageSubmit = styled.input`
  align-self: center;
  background: #FF6077;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  height: 40px;
  letter-spacing: 1px;
  margin: 0 10px;
  width: 300px;
  &:focus {
    outline: none;
  }
  cursor: pointer;
`;

const GiphyForm = styled.form`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
`;

const GiphyInput = styled.input`
  border: 0;
  color: #8e8e8e;
  font-size: 14px;
  letter-spacing: 0.5px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const GiphySubmit = styled.input`
  align-self: center;
  background: #FF6077;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  height: 40px;
  letter-spacing: 1px;
  margin: 0 10px;
  width: 300px;
  &:focus {
    outline: none;
  }
  cursor: pointer;
`;