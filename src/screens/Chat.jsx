/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*----------  Custom Imports  ----------*/
import {
  NewMessage,
  MessageList,
  withAuthorization,
} from 'components';

/*=========================================
=            Chat Component            =
=========================================*/

class Chat extends Component {

  constructor(props) {
    super(props);
    this.socket = io({
      path: '/chat',
      autoConnect: false,
      extraHeaders: {
        authorization: props.token,
      },
    });
    this.bindSocketEvents();
    this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  bindSocketEvents() {
    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('message', this.onMessage.bind(this));
    this.socket.open();
  }

  onMessage(payload) {
    this.props.addNewMessage(payload.username, payload.message, payload.id);
  }

  onConnect() {
    console.log(`Connected! Socket ID : ${this.socket.id}`);
    this.props.setConnectionState(true);
  }

  onDisconnect() {
    console.log('Socket Disconnected :(');
    this.props.setConnectionState(false);
  }

  sendNewMessage(message) {
    this.socket.emit('new message', {
      username: this.props.username,
      message: message,
    });
  }

  render() {
    return (
      <CenterStack>
        <CurrentUser>
          <UserIcon icon='user-astronaut'></UserIcon>
          <Username>{this.props.username}</Username>
        </CurrentUser>
        <DescriptionContainer>
          <NewMessage sendMessage={ this.sendNewMessage } />
          <MessageList />
        </DescriptionContainer>
      </CenterStack>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userState.token,
  username: state.userState.username,
});

const mapDispatchToProps = dispatch => ({
  setConnectionState: connected => dispatch({
    type: 'SET_CONNECTION_STATE',
    connected: connected,
  }),
  addNewMessage: (username, message, id) => dispatch({
    type: 'ADD_MESSAGE',
    username,
    message,
    id,
  }),
});

Chat.propTypes = {
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  setConnectionState: PropTypes.func.isRequired,
  addNewMessage: PropTypes.func.isRequired,
};

export default withAuthorization(connect(mapStateToProps, mapDispatchToProps)(Chat));

/*=====  End of Chat Component  ======*/

const CenterStack = styled.div`
  align-items: center;
  height: calc(100% - 150px);
  margin-top: 150px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
`;

const CurrentUser = styled.article`
  align-items: center;
  display: flex;
  height: 26px;
  justify-content: flex-end;
  max-width: 800px;
  width: 100%;
`;

const Username = styled.div`
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  padding: 0 10px;
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 26px;
`;

const DescriptionContainer = styled.article`
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  max-width: 800px;
  width: 100%;
`;
