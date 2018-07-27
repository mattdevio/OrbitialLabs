/*----------  Vendor Imports  ----------*/
import React, { Component } from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import Message from './Message';
import Giphy from './Giphy';

/*=========================================
=           Message List Component         =
=========================================*/

class NewMessage extends Component {

  constructor(props) {

    super(props);
    this.state = {
      messages: [
        // {
        //   id: 0,
        //   username: 'test1',
        //   message: 'Hello World',
        // },
        // {
        //   id: 1,
        //   username: 'user2',
        //   message: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        // },
      ],
    };
  }
  
  render() {

    const { messages } = this.state;
    const list = messages.map(x => <Message key={x.id} data={x}></Message>);

    return (
      <MessageListContainer>
        { messages.length > 0 ?
          <MessageList>{list}</MessageList> :
          <DescriptionHeader />
        }
        <Giphy search="dog" />
      </MessageListContainer>
    );
  }
}

export default NewMessage;

/*=====  End of Message List Component  ======*/

const MessageListContainer = styled.section`
  height: 100%;
  overflow: scroll;
  width: 100%;
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
