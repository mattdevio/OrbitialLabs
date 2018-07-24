/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/*=========================================
=           New Message Component         =
=========================================*/

class NewMessage extends Component {

  constructor(props) {

    super(props);
    this.state = { message: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMicrophone = this.handleMicrophone.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleSubmit(event) {

    event.preventDefault();
  }

  handleMicrophone() {
    console.log('open microphone');
  }

  handleMessage(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <NewMessageContainer>
        <SpeechToTextContainer>
          <StyledFontAwesomeIcon icon='microphone' onClick={this.handleMicrophone} />
        </SpeechToTextContainer>
        <NewMessageForm onSubmit={this.handleSubmit}>
          <MessageInput type='text' placeholder='Type something...' value={this.state.message} onChange={this.handleMessage} />
          <MessageSubmit type='submit' value='ADD MESSAGE' />
        </NewMessageForm>
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
  color: #b4b4b4;
  display: inline-block;
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
