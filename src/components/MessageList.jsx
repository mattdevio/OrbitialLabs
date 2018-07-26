/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------  Custom Imports  ----------*/
import Message from './Message';

/*=========================================
=           Message List Component         =
=========================================*/

class MessageBox extends Component {
  
  render() {
    const { connected } = this.props;
    return (
      <MessageListContainer>
        <ConnectionStatus
          connected={ connected }
          show={ !connected }
        />

        <DescriptionHeader />
      </MessageListContainer>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.chatState.connected,
});

MessageBox.propTypes = {
  connected: PropTypes.bool.isRequired,
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
