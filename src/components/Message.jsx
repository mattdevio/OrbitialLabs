/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/*============================================
=            Message Component               =
============================================*/

class Message extends Component {

  constructor(props) {

    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {

    console.log('edit message');
  }

  render() {

    const {
      data: {
        message,
        username,
      },
    } = this.props;

    return (
      <MessageContainer>
        <MessageSender>
          <SenderAvatar>{username[0].toUpperCase()}</SenderAvatar>
        </MessageSender>
        <MessageBody>
          <MessageUsername>{username}</MessageUsername>
          <MessageContent>{message}</MessageContent>
        </MessageBody>
        <MessageActions>
          <StyledFontAwesomeIcon icon='ellipsis-h' onClick={this.handleEdit} />
        </MessageActions>
      </MessageContainer>
    );
  }
}

Message.propTypes = {
  data: PropTypes.object.isRequired,
  message: PropTypes.string,
  username: PropTypes.string,
};

export default Message;

/*=====  End of ThreeIconGroup Component  ======*/

const MessageContainer = styled.li`
  border-bottom: 1px solid #f4f4f4;
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  list-style: none;
  margin: 25px;
`;

const MessageSender = styled.section`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 150px;
`;

const SenderAvatar = styled.section`
  align-items: center;
  background: linear-gradient(90deg, rgba(255,85,108,1) 0%, rgba(226,120,255,1) 100%);
  border-radius: 50%;
  color: #fff;
  display: flex;
  height: 60px;
  justify-content: center;
  width: 60px;
`;

const MessageBody = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
  width: 100%;
`;

const MessageUsername = styled.section`
  color: #4c4c4c;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const MessageContent = styled.section`
  font-size: 15px;
  height: 100%;
  letter-spacing: 0.5px;
  padding-top: 10px;
`;

const MessageActions = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #b4b4b4;
  font-size: 26px;
  cursor: pointer;
`;
