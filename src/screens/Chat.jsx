/*----------  Vendor Imports  ----------*/
import React from 'react';
import styled from 'styled-components';

/*----------  Custom Imports  ----------*/
import NewMessage from '../components/NewMessage';
import MessageList from '../components/MessageList';

/*=========================================
=            Chat Component            =
=========================================*/

const Chat = () => (
  <LandingMainContainer>
    <Header />
    <BackgroundGradient />
    <CenterStack>
      <DescriptionContainer>
        <NewMessage />
        <MessageList />
      </DescriptionContainer>
    </CenterStack>
  </LandingMainContainer>
);

export default Chat;

/*=====  End of Chat Component  ======*/

const CenterStack = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
`;

const DescriptionContainer = styled.article`
  align-self: flex-end;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-between;
  width: 670px;
`;
