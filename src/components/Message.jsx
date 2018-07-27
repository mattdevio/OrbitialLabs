/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

/*============================================
=            Message Component               =
============================================*/

class Message extends Component {

  constructor(props) {

    super(props);
    this.state = { 
      isEdit: false,
      editMessage: null,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
  }

  handleEdit() {

    this.setState({ isEdit: true });
  }

  handleConfirmEdit() {

    swal('You got it!', 'Message updated.', 'success')
      .then(() => {

        this.setState({
          isEdit: false,
          editMessage: null,
        });
      });
  }

  handleCancelEdit() {

    this.setState({
      isEdit: false,
      editMessage: null,
    });
  }

  handleDelete() {

    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this message.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Poof! Message deleted.', {
            icon: 'success',
          });
        }
      });
  }

  handleChange(event) {

    this.setState({ editMessage: event.target.value });
  }

  render() {

    const {
      message,
      username,
    } = this.props;

    const {
      isEdit,
      editMessage,
    } = this.state;

    return (
      <MessageContainer>
        <MessageSender>
          <SenderAvatar>{username[0].toUpperCase()}</SenderAvatar>
        </MessageSender>
        <MessageBody>
          <MessageUsername>{username}</MessageUsername>
          { !isEdit ?
            <MessageContent>{message}</MessageContent> :
            <EditInput
              type='text'
              value={editMessage || message}
              onChange={this.handleChange}
            />
          }
        </MessageBody>
        { !isEdit ?
          (
            <MessageActions>
              <StyledFontAwesomeIcon icon='pencil-alt' onClick={this.handleEdit} />
              <StyledFontAwesomeIcon icon='times' onClick={this.handleDelete} />
            </MessageActions>
          ) :
          (
            <MessageActions>
              <StyledFontAwesomeIcon icon='check' onClick={this.handleConfirmEdit} />
              <StyledFontAwesomeIcon icon='ban' onClick={this.handleCancelEdit} />
            </MessageActions>
          )
        }
      </MessageContainer>
    );
  }
}

Message.propTypes = {
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

const EditInput = styled.textarea`
  font-size: 15px;
  height: 100%;
  letter-spacing: 0.5px;
  padding-top: 10px;
`;

const MessageActions = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  width: 150px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #b4b4b4;
  font-size: 17px;
  cursor: pointer;
`;
