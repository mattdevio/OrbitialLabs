/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import { Message } from 'components';

/*=========================================
=           Message List Component         =
=========================================*/

class MessageBox extends Component {

  constructor(props) {
    super(props);
    this.renderMessages = this.renderMessages.bind(this);
  }

  renderMessages() {
    const { messages } = this.props;
    return (
      <MessageList>
        {messages.map(payload => (
          <Message
            username={ payload.username }
            message={ payload.message }
            key={ payload.id }
          />
        ))}
      </MessageList>
    );
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    const { connected, messages } = this.props;
    return (
      <MessageListContainer>
        <ConnectionStatus
          connected={ connected }
          show={ !connected }
        />
        { messages.length ? this.renderMessages() : <DescriptionHeader /> }
      </MessageListContainer>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.chatState.connected,
  messages: state.chatState.messages,
});

MessageBox.propTypes = {
  connected: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    message: PropTypes.string,
    id: PropTypes.string,
  })),
};

export default connect(mapStateToProps)(MessageBox);

/*=====  End of Message List Component  ======*/

const MessageListContainer = styled.section`
  height: 100%;
  overflow: scroll;
  width: 100%;
  position: relative;
`;

const ConnectionStatus = styled.p.attrs({
  children: ({ connected }) => connected ? 'connected!' : 'connecting...',
  style: ({ show }) => ({
    maxHeight: show ? '25px' : 0,
  }),
})`
  padding: 0;
  margin: 0;
  display: block;
  width: 100%;
  background: ${({ connected }) => connected ? '#badc58' : '#f6e58d' };
  border: 2px solid ${({ connected }) => connected ? '#6ab04c' : '#f9ca24' };
  color: #000;
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: max-height 0.5s 2s;
  overflow: hidden;
`;


const MessageList = styled.ul`
  padding: 0;
`;

const DescriptionHeader = styled.h3.attrs({
  children: 'No new posts.',
})`
  color: #585858;
  font-weight: 300;
  letterSpacing: 1px;
  text-align: center;
  margin-top: 100px;
`;
