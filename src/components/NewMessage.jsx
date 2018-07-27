/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import Speech from 'bin/SpeechRecognition';

/*=========================================
=           New Message Component         =
=========================================*/

class NewMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isRecording: false,
    };
    const { recognition } = Speech.getInstance();
    if (recognition) {
      this.setupSpeechEvents();
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMicrophone = this.handleMicrophone.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  setupSpeechEvents() {
    const { recognition } = Speech.getInstance();
    recognition.onstart = () => this.setState({ isRecording: true });
    recognition.onspeechend = () => this.setState({ isRecording: false });
    recognition.onerror = (event) => {
      if (event.error === 'no-speech') this.setState({ isRecording: false });
    };
    recognition.onresult = (event) => {
      console.log(event);
      const index = event.resultIndex;
      const transcript = event.results[index][0].transcript;
      const repeat = (index === 1 && transcript === event.results[0][0].transcript);
      if (!repeat) this.setState({ message: `${this.state.message} ${transcript}` });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const s = { message: this.state.message };
    s.message = s.message.trim();
    if (!s.message) {
      return this.setState(s);
    } else {
      this.props.sendMessage(s.message);
      this.setState({message: ''});
    }
  }

  handleMicrophone() {
    const { isRecording } = this.state;
    const { recognition } = Speech.getInstance();
    if (!isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }

  handleMessage(event) {
    this.setState({ message: event.target.value });
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
      </NewMessageContainer>
    );
  }
}

NewMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

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
  width: 100%;
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
